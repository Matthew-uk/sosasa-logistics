import type { Metadata } from 'next';
import NewOrderClient from './NewOrderClient';

export const metadata: Metadata = { title: 'New Order' };

export default function NewOrderPage() {
  return <NewOrderClient />;
}
