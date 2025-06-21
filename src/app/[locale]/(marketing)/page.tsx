import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: 'Compute Platform - High Performance Computing',
    description: 'Access powerful GPU and CPU resources for your compute-intensive workloads',
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-6">
          High Performance Computing Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Access powerful GPU and CPU resources on-demand for your compute-intensive workloads
        </p>

        {/* TODO: Add hero section with key benefits */}
        {/* TODO: Add pricing preview cards */}
        {/* TODO: Add supported hardware types showcase */}
        {/* TODO: Add customer testimonials */}
        {/* TODO: Add call-to-action buttons (Sign Up, View Pricing) */}

        <div className="bg-gray-100 p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">TODO: Landing Page Features</h2>
          <ul className="text-left space-y-2">
            <li>• Hero section with value proposition</li>
            <li>• Hardware types showcase (GPUs, CPUs, etc.)</li>
            <li>• Pricing tiers preview</li>
            <li>• Use cases (ML training, rendering, simulation)</li>
            <li>• Customer testimonials</li>
            <li>• Getting started guide</li>
            <li>• Integration examples</li>
          </ul>
        </div>
      </div>
    </>
  );
}
