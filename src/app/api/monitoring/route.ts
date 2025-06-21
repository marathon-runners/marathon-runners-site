import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  getLatestMonitoringData,
  insertMonitoringData,
} from '@/libs/DatabaseService';

// TODO: Implement monitoring API endpoints
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const jobId = url.searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 },
      );
    }

    const monitoringData = await getLatestMonitoringData(
      Number.parseInt(jobId),
    );
    return NextResponse.json({ monitoring: monitoringData });
  } catch (error) {
    console.error('Failed to fetch monitoring data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      jobId,
      cpuUsage,
      memoryUsage,
      gpuUsage,
      networkIn,
      networkOut,
      diskUsage,
    } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 },
      );
    }

    await insertMonitoringData({
      jobId,
      cpuUsage,
      memoryUsage,
      gpuUsage,
      networkIn,
      networkOut,
      diskUsage,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to insert monitoring data:', error);
    return NextResponse.json(
      { error: 'Failed to insert monitoring data' },
      { status: 500 },
    );
  }
}
