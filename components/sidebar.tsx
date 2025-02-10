"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getAuthorizedPaths, type Role } from "@/config/navPaths";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") as Role;
    const team = searchParams?.get("team");

    const navItems = getAuthorizedPaths(role);

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <Link
                                href="/"
                                className="flex items-center justify-center"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold">
                                        BC Pay
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {role === "teamLead"
                                            ? `${team} Team`
                                            : role?.toUpperCase()}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <SidebarMenuItem key={path} className="px-2">
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === path}
                            >
                                <Link
                                    href={`${path}?${searchParams?.toString()}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
