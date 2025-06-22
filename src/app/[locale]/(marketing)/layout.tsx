import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { AppConfig } from '@/utils/AppConfig';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return (
    <div className="w-full text-gray-700 antialiased">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {AppConfig.name}
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/pricing/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Pricing
              </Link>
              <a
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                href="https://docs.marathon-runners.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </nav>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {t('sign_in_link')}
              </Link>
              <Link
                href="/sign-up/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                {t('sign_up_link')}
              </Link>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">{props.children}</main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">{AppConfig.name}</h3>
              <p className="text-gray-400 mb-4">
                High-performance cloud computing platform for AI, ML, and
                scientific workloads.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="https://docs.marathon-runners.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="hover:text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:hello@marathon-runners.com"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://status.marathon-runners.com"
                    className="hover:text-white transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.marathon-runners.com"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy;
              {new Date().getFullYear()}
              {' '}
              {AppConfig.name}
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
