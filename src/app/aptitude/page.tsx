import type { Metadata } from 'next';
import SectionPage from '@/components/curriculum/SectionPage';

export const metadata: Metadata = {
  title: 'Aptitude Practice & Notes — StackUp',
  description: 'Quantitative aptitude, logical reasoning, and data interpretation revision notes and timed quizzes.',
};

export default function AptitudeRoute() {
  return <SectionPage sectionKey="aptitude" />;
}
