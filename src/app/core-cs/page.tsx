import type { Metadata } from 'next';
import SectionPage from '@/components/curriculum/SectionPage';

export const metadata: Metadata = {
  title: 'Core CS Subjects — StackUp',
  description: 'Operating Systems, DBMS, Computer Networks, OOPs, System Design, Software Engineering, COA, and Compiler Design revision summaries and high-frequency interview quizzes.',
};

export default function CoreCsRoute() {
  return <SectionPage sectionKey="core-cs" />;
}
