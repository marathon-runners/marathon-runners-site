import {
  BoltIcon,
  CheckIcon,
  CloudIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type IPricingProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IPricingProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Pricing',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Pricing(props: IPricingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'Pricing',
  });

  const pricingTiers = [
    {
      name: 'Starter',
      description: 'Perfect for individual developers and small projects',
      price: '$0.50',
      period: 'per hour',
      features: [
        'NVIDIA RTX 4090 GPUs',
        '24GB VRAM',
        '100GB SSD Storage',
        'Community Support',
        'Basic Monitoring',
        'Pay-per-use billing',
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Professional',
      description: 'Ideal for teams and production workloads',
      price: '$2.50',
      period: 'per hour',
      features: [
        'NVIDIA A100 GPUs',
        '80GB HBM2e Memory',
        '500GB NVMe Storage',
        'Priority Support',
        'Advanced Monitoring',
        'Volume Discounts',
        'Custom Configurations',
        'API Access',
      ],
      popular: true,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Enterprise',
      description: 'For large-scale deployments and organizations',
      price: '$8.00',
      period: 'per hour',
      features: [
        'NVIDIA H100 GPUs',
        '128GB HBM3 Memory',
        '2TB NVMe Storage',
        'Dedicated Support',
        'Custom Monitoring',
        'Reserved Instances',
        'Private Clusters',
        'SLA Guarantees',
        'Custom Integrations',
      ],
      popular: false,
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  const hardwareTypes = [
    {
      category: 'GPU Compute',
      icon: CpuChipIcon,
      items: [
        { name: 'NVIDIA H100', price: '$8.00/hr', specs: '128GB HBM3, 3.35 TFLOPS FP64' },
        { name: 'NVIDIA A100', price: '$2.50/hr', specs: '80GB HBM2e, 1.56 TFLOPS FP64' },
        { name: 'NVIDIA RTX 4090', price: '$0.50/hr', specs: '24GB GDDR6X, 0.83 TFLOPS FP64' },
        { name: 'NVIDIA V100', price: '$1.20/hr', specs: '32GB HBM2, 1.25 TFLOPS FP64' },
      ],
    },
    {
      category: 'CPU Compute',
      icon: CloudIcon,
      items: [
        { name: 'AMD EPYC 7763', price: '$0.25/hr', specs: '64 cores, 256GB RAM' },
        { name: 'Intel Xeon 8380', price: '$0.30/hr', specs: '40 cores, 256GB RAM' },
        { name: 'AMD EPYC 7713', price: '$0.20/hr', specs: '64 cores, 128GB RAM' },
        { name: 'Intel Xeon 8375C', price: '$0.15/hr', specs: '32 cores, 128GB RAM' },
      ],
    },
  ];

  const features = [
    {
      icon: BoltIcon,
      title: 'Instant Scaling',
      description: 'Scale from 1 to 1000+ instances in seconds',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Regions',
      description: 'Available in 15+ regions worldwide',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Transparent Pricing',
      description: 'No hidden fees, pay only for what you use',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('page_title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('page_description')}
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Flexible pricing that scales with your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative ${tier.popular ? 'transform scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${tier.gradient} p-6 text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-white/90 mb-4">{tier.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-white/80 ml-2">{tier.period}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/sign-up"
                      className={`w-full block text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        tier.popular
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hardware Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Detailed pricing for all available hardware configurations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {hardwareTypes.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <span className="text-lg font-bold text-blue-600">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.specs}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600">
              Built for performance, reliability, and cost-effectiveness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is billing calculated?
              </h3>
              <p className="text-gray-600">
                Billing is calculated per second of actual usage. You only pay for the time your instances are running, with no minimum charges or setup fees.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are there volume discounts available?
              </h3>
              <p className="text-gray-600">
                Yes! We offer automatic volume discounts starting at $1,000/month usage. Enterprise customers can also negotiate custom pricing for reserved capacity.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What regions are available?
              </h3>
              <p className="text-gray-600">
                We operate in 15+ regions globally including US East/West, Europe, Asia-Pacific, and more. Pricing may vary slightly by region based on local infrastructure costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Start with our free tier and scale as you grow
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/sign-up"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/sign-in"
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
