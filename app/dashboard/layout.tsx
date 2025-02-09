import type React from "react";
import { DashboardSidebar } from "@/components/sidebar";
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar";
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
                <DashboardSidebar />
                <SidebarInset>
                    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background w-full px-6">
                        <SidebarTrigger />
                        <BreadcrumbNavigation />
                    </header>
                    <main className="flex-1 space-y-4 p-8 pt-6 w-full">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
