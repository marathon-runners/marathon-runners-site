import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  createProject,
  deleteProject,
  getProjectsByUserId,
  updateProject,
} from '@/libs/DatabaseService';

// TODO: Implement projects API endpoints
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await getProjectsByUserId(userId);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
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
    const { name, description, budget } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 },
      );
    }

    const project = await createProject({
      name,
      description,
      budget,
      userId,
      isDefault: false,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, ...updates } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 },
      );
    }

    await updateProject(projectId, updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 },
      );
    }

    await deleteProject(Number(projectId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 },
    );
  }
}
