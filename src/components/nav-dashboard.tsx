"use client";

import { Collapsible } from "app/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "app/components/ui/sidebar";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dataMenu } from "app/utils/data-menu";

export function NavDashboard() {
  // -- Hooks
  const currentPath = usePathname();

  // -- States
  const items = useMemo(() => dataMenu, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentPath === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
