'use client';

import { SignOutButton } from '@clerk/nextjs';
import {
  BellIcon,
  ChevronDownIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useUserProfile } from '@/components/dashboard/UserContext';

type UserAccountSectionProps = {
  className?: string;
};

export function UserAccountSection({
  className = '',
}: UserAccountSectionProps) {
  const router = useRouter();
  const { userProfile, isLoading } = useUserProfile();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const userPopupRef = useRef<HTMLDivElement>(null);

  // Close user popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userPopupRef.current
        && !userPopupRef.current.contains(event.target as Node)
      ) {
        setShowUserPopup(false);
      }
    };

    if (showUserPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserPopup]);

  const handleSettingsNavigation = (tab: string) => {
    setShowUserPopup(false);
    router.push(`/settings?tab=${tab}`);
  };

  if (isLoading || !userProfile) {
    return (
      <div className={`border-t border-gray-200 p-4 ${className}`}>
        <div className="w-full flex items-center gap-3 p-2 rounded-lg">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  const displayName
    = userProfile.firstName && userProfile.lastName
      ? `${userProfile.firstName} ${userProfile.lastName}`
      : 'User Account';

  return (
    <div className={`border-t border-gray-200 p-4 relative ${className}`}>
      <button
        onClick={() => setShowUserPopup(!showUserPopup)}
        className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <UserIcon className="h-5 w-5 text-gray-600" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-gray-900">{displayName}</div>
          <div className="text-xs text-gray-500">{userProfile.email}</div>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 transition-transform ${showUserPopup ? 'rotate-180' : ''}`}
        />
      </button>

      {/* User Popup Menu */}
      {showUserPopup && (
        <div
          ref={userPopupRef}
          className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="p-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">
              {displayName}
            </div>
            <div className="text-xs text-gray-500">{userProfile.email}</div>
            <div className="mt-2 text-xs">
              <span className="text-gray-600">Credits: </span>
              <span className="font-semibold text-green-600">
                {userProfile.credits.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => handleSettingsNavigation('profile')}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              Profile Settings
            </button>
            <button
              onClick={() => handleSettingsNavigation('billing')}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <CreditCardIcon className="h-4 w-4" />
              Billing & Credits
            </button>
            <button
              onClick={() => handleSettingsNavigation('notifications')}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <BellIcon className="h-4 w-4" />
              Notifications
            </button>
            <button
              onClick={() => handleSettingsNavigation('security')}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              Security
            </button>
            <button
              onClick={() => handleSettingsNavigation('support')}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <QuestionMarkCircleIcon className="h-4 w-4" />
              Help & Support
            </button>
          </div>

          <div className="border-t border-gray-100 py-1">
            <SignOutButton>
              <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}
