"use client";

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar as UiAvatar, AvatarFallback } from "app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "app/components/ui/sidebar";
import { Badge } from "app/components/ui/badge";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { memo, useCallback, useMemo } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { redirect } from "next/navigation";

interface UserInfo {
  name: string;
  email: string;
  app: number | string;
  isAuthenticated: boolean;
}

function UserAvatar({ user }: { user: UserInfo }) {
  if (user.isAuthenticated) {
    /* User authenticated avatar */
    const config = genConfig(user.email);
    return <Avatar className="h-8 w-8" {...config} />;
  } else {
    /* User not authenticated avatar */
    return (
      <UiAvatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">NN</AvatarFallback>
      </UiAvatar>
    );
  }
}

export function NavUser() {
  // -- Hooks
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  // -- State
  const user = useMemo<UserInfo>(() => {
    return {
      name: session?.user?.name ?? "Anonymous",
      email: session?.user?.email ?? "-",
      app: session?.user?.app_id ?? "-",
      isAuthenticated: !!session,
    };
  }, [session]);

  // -- Handlers
  const handleLogout = useCallback(() => {
    signOut({ redirectTo: "/" });
  }, []);

  const handleSignIn = useCallback(() => {
    redirect("/sign-in");
  }, []);

  // -- Reuse components
  const InfoUser = memo(function InfoUser({ user }: { user: UserInfo }) {
    return (
      <>
        <UserAvatar user={user} />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {user.name}{" "}
            {user.isAuthenticated ? (
              <Badge variant="default" className="ml-2">
                APP {user.app}
              </Badge>
            ) : null}{" "}
          </span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
      </>
    );
  });

  // -- Render
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <InfoUser user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {session ? (
              <>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <InfoUser user={user} />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleSignIn}>
                <Sparkles />
                Sign in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
