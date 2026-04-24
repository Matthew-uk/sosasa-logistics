import type { Metadata } from 'next';
import ReceiptClient from './ReceiptClient';

export const metadata: Metadata = { title: 'Receipt' };

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReceiptClient id={id} />;
}
