import { getTranslations } from 'next-intl/server';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Compute Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your jobs, projects, and compute resources
        </p>
      </div>

      {/* Tabbed Interface */}
      <DashboardTabs />
    </div>
  );
}
