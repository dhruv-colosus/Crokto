"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full">
        <TopBar />
        <div className="flex-grow overflow-auto no-scrollbar">
          <main className="h-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
