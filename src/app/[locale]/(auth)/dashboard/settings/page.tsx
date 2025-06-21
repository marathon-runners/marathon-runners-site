'use client';

import {
  UserIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type TabType = 'profile' | 'billing' | 'notifications' | 'security' | 'support';

function SettingsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam && ['profile', 'billing', 'notifications', 'security', 'support'].includes(tabParam) ? tabParam : 'profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam && ['profile', 'billing', 'notifications', 'security', 'support'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs = [
    { id: 'profile' as TabType, name: 'Profile Settings', icon: UserIcon },
    { id: 'billing' as TabType, name: 'Billing & Credits', icon: CreditCardIcon },
    { id: 'notifications' as TabType, name: 'Notifications', icon: BellIcon },
    { id: 'security' as TabType, name: 'Security', icon: ShieldCheckIcon },
    { id: 'support' as TabType, name: 'Help & Support', icon: QuestionMarkCircleIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="user@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Primary API Key</div>
                    <div className="text-sm text-gray-500 font-mono">
                      {showApiKey ? 'sk-1234567890abcdef1234567890abcdef' : '••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <PlusIcon className="h-4 w-4" />
                  Generate New API Key
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Credits Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
                  <div className="text-3xl font-bold text-blue-600">1,250 Credits</div>
                  <div className="text-sm text-gray-600">≈ $125.00 USD</div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add Credits
                </button>
              </div>
            </div>

            {/* Usage This Month */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Usage This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Credits Used</div>
                  <div className="text-2xl font-bold text-gray-900">327</div>
                  <div className="text-sm text-gray-600">$32.70</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Compute Hours</div>
                  <div className="text-2xl font-bold text-gray-900">14.2</div>
                  <div className="text-sm text-gray-600">GPU + CPU</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Storage Used</div>
                  <div className="text-2xl font-bold text-gray-900">2.3 GB</div>
                  <div className="text-sm text-gray-600">Data + Models</div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/27</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Default</span>
                    <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <PlusIcon className="h-4 w-4" />
                  Add Payment Method
                </button>
              </div>
            </div>

            {/* Billing History */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Dec 15, 2024</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Credit Purchase</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$50.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Dec 10, 2024</td>
                      <td className="px-4 py-3 text-sm text-gray-900">GPU Usage - A100</td>
                      <td className="px-4 py-3 text-sm text-gray-900">-$24.50</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Usage</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Auto-Recharge */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Auto-Recharge</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center mb-4">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-700">Enable auto-recharge when balance is low</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recharge when balance falls below
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>50 credits ($5.00)</option>
                      <option>100 credits ($10.00)</option>
                      <option>200 credits ($20.00)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recharge amount
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>500 credits ($50.00)</option>
                      <option>1000 credits ($100.00)</option>
                      <option>2000 credits ($200.00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Job Completion</div>
                    <div className="text-sm text-gray-500">Get notified when your jobs finish</div>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Job Failures</div>
                    <div className="text-sm text-gray-500">Get notified when jobs fail or encounter errors</div>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Low Credit Balance</div>
                    <div className="text-sm text-gray-500">Get notified when your credit balance is low</div>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Weekly Usage Summary</div>
                    <div className="text-sm text-gray-500">Weekly summary of your platform usage</div>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Slack Integration</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Slack Notifications</div>
                    <div className="text-sm text-gray-500">Send notifications to your Slack workspace</div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    Connect Slack
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Connect your Slack workspace to receive job notifications, alerts, and updates directly in your channels.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Webhook Notifications</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-1">
                    Webhook URL
                  </label>
                  <input
                    id="webhook-url"
                    type="url"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://your-app.com/webhooks/compute-platform"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  Receive HTTP POST requests when events occur on your account.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Notification Settings
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Two-Factor Authentication
                      {twoFactorEnabled && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Enabled</span>}
                    </div>
                    <div className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`px-4 py-2 rounded-md ${
                      twoFactorEnabled
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
                {twoFactorEnabled && (
                  <div className="text-sm text-gray-600">
                    Two-factor authentication is active. You'll need your authenticator app to sign in.
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Current Session</div>
                    <div className="text-sm text-gray-500">Chrome on macOS • San Francisco, CA</div>
                    <div className="text-sm text-gray-500">Last active: Now</div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Mobile App</div>
                    <div className="text-sm text-gray-500">iPhone • New York, NY</div>
                    <div className="text-sm text-gray-500">Last active: 2 hours ago</div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Sign out of all other sessions
              </button>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get help with technical issues, billing questions, or account problems.
                  </p>
                  <a
                    href="mailto:support@compute-platform.com"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    support@compute-platform.com
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Live Chat</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Chat with our support team in real-time for immediate assistance.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Documentation</h3>
              <div className="space-y-3">
                <a
                  href="https://docs.compute-platform.com/getting-started"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">Getting Started Guide</div>
                  <div className="text-sm text-gray-600">Learn the basics of using the platform</div>
                </a>
                <a
                  href="https://docs.compute-platform.com/api"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">API Documentation</div>
                  <div className="text-sm text-gray-600">Complete API reference and examples</div>
                </a>
                <a
                  href="https://docs.compute-platform.com/troubleshooting"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">Troubleshooting</div>
                  <div className="text-sm text-gray-600">Common issues and solutions</div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">All Systems Operational</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  All services are running normally. Last updated: 2 minutes ago
                </div>
                <a
                  href="https://status.compute-platform.com"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Status Page →
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Requests</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Have an idea for a new feature? We'd love to hear from you!
                </p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                  Submit Feature Request
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  return (
    <Suspense fallback={
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </nav>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
