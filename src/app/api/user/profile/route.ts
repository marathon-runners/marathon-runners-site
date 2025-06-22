import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Since we're using Clerk for auth and don't have user profiles in DB yet,
    // we'll return a default profile structure
    // TODO: Implement actual user profile storage in database
    const profile = {
      id: userId,
      email: '', // This should come from Clerk user data
      firstName: '',
      lastName: '',
      company: '',
      credits: 1250,
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
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 },
    );
  }
}

export async function PUT(_request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Implement actual profile update logic
    // For now, just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 },
    );
  }
}
