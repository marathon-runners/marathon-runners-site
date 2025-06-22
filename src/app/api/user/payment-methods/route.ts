import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, last4, expiryMonth, expiryYear, isDefault } = body;

    if (!type || !last4) {
      return NextResponse.json(
        { error: 'Payment method type and last4 are required' },
        { status: 400 },
      );
    }

    // TODO: Implement actual payment method storage
    // For now, return a mock payment method
    const paymentMethod = {
      id: `pm_${Date.now()}`,
      type,
      last4,
      expiryMonth,
      expiryYear,
      isDefault: isDefault || false,
    };

    return NextResponse.json({ paymentMethod }, { status: 201 });
  } catch (error) {
    console.error('Failed to add payment method:', error);
    return NextResponse.json(
      { error: 'Failed to add payment method' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const methodId = searchParams.get('methodId');

    if (!methodId) {
      return NextResponse.json(
        { error: 'Payment method ID is required' },
        { status: 400 },
      );
    }

    // TODO: Implement actual payment method deletion
    // For now, just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete payment method:', error);
    return NextResponse.json(
      { error: 'Failed to delete payment method' },
      { status: 500 },
    );
  }
}
