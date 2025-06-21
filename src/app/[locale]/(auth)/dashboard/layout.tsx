import type { ReactNode } from 'react';
import { LeftSidebar } from '@/components/dashboard/LeftSidebar';
import { RightSidebar } from '@/components/dashboard/RightSidebar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
