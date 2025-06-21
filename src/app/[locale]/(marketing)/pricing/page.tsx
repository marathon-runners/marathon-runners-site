import { setRequestLocale } from 'next-intl/server';

type IPricingProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IPricingProps) {
  const { locale } = await props.params;

  return {
    title: 'Pricing - Compute Platform',
    description: 'Transparent pricing for GPU and CPU compute resources',
  };
}

export default async function Pricing(props: IPricingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Compute Pricing</h1>
        <p className="text-gray-600">Pay only for what you use with transparent pricing</p>
      </div>

      {/* TODO: Add pricing tiers/cards */}
      {/* TODO: Add hardware type pricing tables */}
      {/* TODO: Add regional pricing differences */}
      {/* TODO: Add volume discounts information */}
      {/* TODO: Add pricing calculator tool */}

      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">TODO: Pricing Page Features</h2>
        <ul className="space-y-2">
          <li>• GPU pricing tiers (A100, H100, RTX series)</li>
          <li>• CPU pricing (various core counts)</li>
          <li>• Storage pricing (SSD, NVMe)</li>
          <li>• Network pricing (bandwidth)</li>
          <li>• Regional pricing variations</li>
          <li>• Volume discount tiers</li>
          <li>• Interactive pricing calculator</li>
          <li>• Billing options (hourly, monthly, reserved)</li>
          <li>• Free tier information</li>
        </ul>
      </div>
    </div>
  );
}
