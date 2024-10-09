"use client";

import Link from "next/link";
import {
  Bell,
  Binoculars,
  BookHeart,
  BookOpenCheck,
  ListTodo,
  MonitorUp,
  SquareLibrary,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { OktoContextType, useOkto } from "okto-sdk-react";

function SideBar() {
  const pathname = usePathname();

  const { showWidgetModal } = useOkto() as OktoContextType;

  const getLinkClass = (href: string) => {
    const baseClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
    const activeClass = "bg-muted text-primary";
    const inactiveClass = "text-muted-foreground hover:text-primary";

    return `${baseClass} ${pathname === href ? activeClass : inactiveClass}`;
  };

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block h-screen w-[20%]  ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpenCheck className="h-6 w-6 " strokeWidth={2.5} />
              <span className="font-raleway font-black text-xl">Crokto</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
              {/* Student View Section */}
              <div className="space-y-2">
                <h2 className="my-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Student Dashboard
                </h2>
                <div className="space-y-1">
                  <Link href="/" className={getLinkClass("/")}>
                    <SquareLibrary className="h-4 w-4" />
                    All Courses
                  </Link>
                  <Link
                    href="/mycourses"
                    className={getLinkClass("/mycourses")}
                  >
                    <BookHeart className="h-4 w-4" />
                    My Courses
                  </Link>
                  <Link href="/mytasks" className={getLinkClass("/mytasks")}>
                    <ListTodo className="h-4 w-4" />
                    My Tasks
                  </Link>
                </div>
              </div>

              {/* Creator View Section */}
              <div className="space-y-2 pt-4">
                <h2 className="my-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Creator Dasboard
                </h2>
                <div className="space-y-1">
                  <Link
                    href="/creator/upload"
                    className={getLinkClass("/creator/upload")}
                  >
                    <MonitorUp className="h-4 w-4" />
                    Upload Course
                  </Link>
                  <Link
                    href="/creator/manage"
                    className={getLinkClass("/creator/manage")}
                  >
                    <Binoculars className="h-4 w-4" />
                    Manage Courses
                  </Link>
                  <Link
                    href="/creator/profile"
                    className={getLinkClass("/creator/profile")}
                  >
                    <UserRound className="h-4 w-4" />
                    My Profile
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Powered by OktoWallet</CardTitle>
                {/* <CardDescription>
                  Wallet ID : a2ieurfherifnerinurnirneuf
                </CardDescription> */}
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full" onClick={showWidgetModal}>
                  Show Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
