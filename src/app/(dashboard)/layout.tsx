"use client";

import { SessionProvider } from "next-auth/react";
import { AppSidebar } from "app/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "app/components/ui/breadcrumb";
import { Separator } from "app/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "app/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { dataMenu } from "app/utils/data-menu";
import { ModeToggle } from "app/components/mode-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  // -- Hooks
  const currentPath = usePathname()

  // -- Events
  const currentSection = useMemo(() => {
    return dataMenu.find(item => currentPath === item.url)?.title ?? "-"
  }, [currentPath])

  // -- Render
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentSection}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
