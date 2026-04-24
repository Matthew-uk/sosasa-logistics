import { NextResponse } from 'next/server';
import { connectDB } from '../../_server/db';
import { getSession } from '../../_server/auth';
import Order from '../../_models/Order';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const [
    totalOrders,
    statusBreakdown,
    revenueAgg,
    deliveryModeAgg,
    originAgg,
    ordersLast30,
    ordersPrev30,
    revenueLast30,
    revenuePrev30,
    dailyOrders,
  ] = await Promise.all([
    Order.countDocuments({}),

    Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),

    Order.aggregate([
      { $match: { chargedPrice: { $exists: true, $ne: null } } },
      { $group: { _id: null, total: { $sum: '$chargedPrice' }, avg: { $avg: '$chargedPrice' }, count: { $sum: 1 } } },
    ]),

    Order.aggregate([
      { $match: { 'parcel.deliveryMode': { $exists: true, $nin: [null, ''] } } },
      { $group: { _id: '$parcel.deliveryMode', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),

    Order.aggregate([
      { $match: { 'parcel.origin': { $exists: true, $nin: [null, ''] } } },
      { $group: { _id: '$parcel.origin', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),

    Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Order.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),

    Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo }, chargedPrice: { $exists: true, $ne: null } } },
      { $group: { _id: null, total: { $sum: '$chargedPrice' } } },
    ]),

    Order.aggregate([
      { $match: { createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }, chargedPrice: { $exists: true, $ne: null } } },
      { $group: { _id: null, total: { $sum: '$chargedPrice' } } },
    ]),

    // Daily order counts for last 30 days
    Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: { $ifNull: ['$chargedPrice', 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const statusMap: Record<string, number> = {};
  for (const s of statusBreakdown) statusMap[s._id] = s.count;

  const revenueData = revenueAgg[0] ?? { total: 0, avg: 0, count: 0 };
  const revLast30 = revenueLast30[0]?.total ?? 0;
  const revPrev30 = revenuePrev30[0]?.total ?? 0;
  const revGrowth = revPrev30 === 0 ? null : ((revLast30 - revPrev30) / revPrev30) * 100;
  const orderGrowth = ordersPrev30 === 0 ? null : ((ordersLast30 - ordersPrev30) / ordersPrev30) * 100;

  return NextResponse.json({
    totalOrders,
    statusBreakdown: statusMap,
    revenue: {
      total: revenueData.total,
      avg: revenueData.avg,
      pricedOrderCount: revenueData.count,
      last30Days: revLast30,
      prev30Days: revPrev30,
      growth: revGrowth,
    },
    deliveryModes: deliveryModeAgg.map((d) => ({ name: d._id, count: d.count })),
    topOrigins: originAgg.map((o) => ({ name: o._id, count: o.count })),
    ordersLast30Days: ordersLast30,
    ordersPrev30Days: ordersPrev30,
    orderGrowth,
    dailyOrders: dailyOrders.map((d) => ({ date: d._id, count: d.count, revenue: d.revenue })),
  });
}
