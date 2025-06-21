import {
  BoltIcon,
  CloudIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

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
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  const features = [
    {
      icon: CpuChipIcon,
      title: 'High-Performance GPUs',
      description:
        'Access NVIDIA H100, A100, and RTX series GPUs for AI/ML training and inference',
    },
    {
      icon: CloudIcon,
      title: 'Scalable Infrastructure',
      description:
        'Scale from single instances to massive clusters with enterprise-grade reliability',
    },
    {
      icon: BoltIcon,
      title: 'Instant Deployment',
      description:
        'Deploy your workloads in seconds with our optimized container runtime',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Pay-per-Use',
      description:
        'Only pay for compute time you actually use with transparent per-second billing',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description:
        'SOC 2 compliant infrastructure with end-to-end encryption and isolation',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Availability',
      description:
        'Choose from multiple regions worldwide for optimal latency and compliance',
    },
  ];

  const useCases = [
    {
      title: 'AI/ML Training',
      description:
        'Train large language models, computer vision, and deep learning models at scale',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: '3D Rendering',
      description:
        'Accelerate video production, architectural visualization, and animation workflows',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: 'Scientific Computing',
      description:
        'Run complex simulations, financial modeling, and research computations',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {t('hero_title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('hero_description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Start Computing Now
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for developers, researchers, and enterprises who need
              reliable, scalable compute power
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Workload
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI research to creative production, our platform scales to
              meet your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className={`bg-gradient-to-br ${useCase.gradient} p-8 text-white min-h-[300px] flex flex-col justify-end transform transition-all duration-300 group-hover:scale-105`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

                    <div className="relative z-10">
                      <SparklesIcon className="h-12 w-12 mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold mb-4">
                        {useCase.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                10k+
              </div>
              <div className="text-gray-600 font-medium">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">GPU Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your Compute?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of developers and researchers already using our
            platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/sign-up"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
