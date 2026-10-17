import type { Metadata } from 'next';
import StriverSheetPage from '@/components/striver/StriverSheetPage';

export const metadata: Metadata = {
  title: "Striver's SDE Sheet — DSA Practice Hub — StackUp",
  description: "Comprehensive TakeUForward Striver SDE Sheet with verified video tutorials, LeetCode portals, and optimal multi-language solutions.",
};

export default function DsaStriverRoute() {
  return <StriverSheetPage />;
}
