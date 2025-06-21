import type { ReactNode } from 'react';
import { DashboardProvider } from '@/components/dashboard/DashboardContext';
import { LeftSidebar } from '@/components/dashboard/left-sidebar';
import { ResizablePanel } from '@/components/dashboard/ResizablePanel';
import { RightSidebar } from '@/components/dashboard/right-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        {/* Left Sidebar - Resizable */}
        <ResizablePanel side="left" defaultWidth={320} minWidth={250} maxWidth={500}>
          <LeftSidebar />
        </ResizablePanel>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Right Sidebar - Self-managing width */}
        <RightSidebar />
      </div>
    </DashboardProvider>
  );
}
