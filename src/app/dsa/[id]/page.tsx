import { notFound, redirect } from 'next/navigation';
import { DSA_PROBLEMS } from '@/lib/data/dsa';

interface ProblemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProblemDeepLinkPage({ params }: ProblemPageProps) {
  const { id } = await params;
  if (!id) notFound();

  const cleanId = id.trim().toLowerCase();
  
  // Find by exact id ('dsa-1'), numeric id ('1'), or slug ('two-sum')
  const problem = DSA_PROBLEMS.find((p) => {
    if (p.id.toLowerCase() === cleanId) return true;
    if (p.id.toLowerCase() === `dsa-${cleanId}`) return true;
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (slug === cleanId) return true;
    return false;
  });

  if (!problem) {
    notFound();
  }

  redirect(`/dsa?problem=${problem.id}`);
}
