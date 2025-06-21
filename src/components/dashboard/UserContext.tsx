'use client';

import type { ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import { createContext, use, useEffect, useState } from 'react';

// Define User profile type
export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  credits: number;
  apiKeys: ApiKey[];
  preferences: UserPreferences;
  billing: BillingInfo;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
};

export type UserPreferences = {
  notifications: {
    emailOnCompletion: boolean;
    emailOnFailure: boolean;
    emailOnLowCredits: boolean;
    weeklyUsageSummary: boolean;
    slackNotifications: boolean;
    webhookUrl?: string;
  };
  security: {
    twoFactorEnabled: boolean;
  };
};

export type BillingInfo = {
  currentBalance: number;
  monthlyUsage: {
    creditsUsed: number;
    computeHours: number;
    storageUsed: number;
  };
  paymentMethods: PaymentMethod[];
  autoRecharge: {
    enabled: boolean;
    threshold: number;
    amount: number;
  };
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
};

type UserContextType = {
  userProfile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  addApiKey: (name: string) => Promise<ApiKey>;
  deleteApiKey: (keyId: string) => Promise<void>;
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, 'id'>) => Promise<void>;
  deletePaymentMethod: (methodId: string) => Promise<void>;
  purchaseCredits: (amount: number) => Promise<void>;
  refreshUserData: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = async () => {
    if (!user) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/profile');

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUserProfile(data.profile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // Set default profile structure if API fails
      setUserProfile({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        credits: 1250, // Default credits
        apiKeys: [],
        preferences: {
          notifications: {
            emailOnCompletion: true,
            emailOnFailure: true,
            emailOnLowCredits: true,
            weeklyUsageSummary: false,
            slackNotifications: false,
          },
          security: {
            twoFactorEnabled: false,
          },
        },
        billing: {
          currentBalance: 1250,
          monthlyUsage: {
            creditsUsed: 327,
            computeHours: 14.2,
            storageUsed: 2.3,
          },
          paymentMethods: [],
          autoRecharge: {
            enabled: false,
            threshold: 50,
            amount: 500,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setUserProfile(prev => (prev ? { ...prev, ...updates } : null));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              preferences: {
                ...prev.preferences,
                ...preferences,
                notifications: {
                  ...prev.preferences.notifications,
                  ...preferences.notifications,
                },
                security: {
                  ...prev.preferences.security,
                  ...preferences.security,
                },
              },
            }
          : null,
      );
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  const addApiKey = async (name: string): Promise<ApiKey> => {
    if (!userProfile) {
      throw new Error('No user profile');
    }

    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create API key');
      }

      const data = await response.json();
      const newApiKey = data.apiKey;

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              apiKeys: [...prev.apiKeys, newApiKey],
            }
          : null,
      );

      return newApiKey;
    } catch (error) {
      console.error('Failed to create API key:', error);
      throw error;
    }
  };

  const deleteApiKey = async (keyId: string) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch(`/api/user/api-keys?keyId=${keyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              apiKeys: prev.apiKeys.filter(key => key.id !== keyId),
            }
          : null,
      );
    } catch (error) {
      console.error('Failed to delete API key:', error);
      throw error;
    }
  };

  const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, 'id'>) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch('/api/user/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethod),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      const data = await response.json();
      const newPaymentMethod = data.paymentMethod;

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              billing: {
                ...prev.billing,
                paymentMethods: [
                  ...prev.billing.paymentMethods,
                  newPaymentMethod,
                ],
              },
            }
          : null,
      );
    } catch (error) {
      console.error('Failed to add payment method:', error);
      throw error;
    }
  };

  const deletePaymentMethod = async (methodId: string) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch(
        `/api/user/payment-methods?methodId=${methodId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              billing: {
                ...prev.billing,
                paymentMethods: prev.billing.paymentMethods.filter(
                  method => method.id !== methodId,
                ),
              },
            }
          : null,
      );
    } catch (error) {
      console.error('Failed to delete payment method:', error);
      throw error;
    }
  };

  const purchaseCredits = async (amount: number) => {
    if (!userProfile) {
      return;
    }

    try {
      const response = await fetch('/api/user/purchase-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to purchase credits');
      }

      await response.json();

      setUserProfile(prev =>
        prev
          ? {
              ...prev,
              credits: prev.credits + amount,
              billing: {
                ...prev.billing,
                currentBalance: prev.billing.currentBalance + amount,
              },
            }
          : null,
      );
    } catch (error) {
      console.error('Failed to purchase credits:', error);
      throw error;
    }
  };

  return (
    <UserContext
      value={{
        userProfile,
        isLoading,
        updateProfile,
        updatePreferences,
        addApiKey,
        deleteApiKey,
        addPaymentMethod,
        deletePaymentMethod,
        purchaseCredits,
        refreshUserData,
      }}
    >
      {children}
    </UserContext>
  );
}

export function useUserProfile() {
  const context = use(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
}
