import { NextResponse } from 'next/server';

// TODO: Implement jobs API endpoints
export async function GET() {
  // TODO: Get all jobs for user
  // TODO: Support filtering by project, status, etc.
  return NextResponse.json({
    message: 'TODO: Implement jobs listing',
    features: [
      'List all user jobs',
      'Filter by project/status/hardware',
      'Pagination support',
      'Search functionality',
    ],
  });
}

export async function POST() {
  // TODO: Create new job
  // TODO: Validate job configuration
  // TODO: Check budget/limits
  return NextResponse.json({
    message: 'TODO: Implement job creation',
    features: [
      'Job creation with validation',
      'Hardware allocation',
      'Budget checking',
      'Queue management',
    ],
  });
}
