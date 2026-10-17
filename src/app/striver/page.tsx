import type { Metadata } from 'next';
import StriverSheetPage from '@/components/striver/StriverSheetPage';

export const metadata: Metadata = {
  title: "Striver's SDE Sheet (150 Problems) — StackUp",
  description: "Comprehensive TakeUForward Striver SDE Sheet with verified video tutorials, LeetCode portals, and optimal multi-language solutions.",
};

export default function StriverRoute() {
  return <StriverSheetPage />;
}
