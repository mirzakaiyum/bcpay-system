"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import ViolationList from "@/components/ViolationList";
import Leaderboard from "@/components/Leaderboard";
import MoneyStatus from "@/components/MoneyStatus";
import TeamViolation from "@/components/TeamViolation";

export default function Dashboard() {
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") || "";
    const team = searchParams?.get("team") || "";

    const stats = {
        pendingViolations: 12,
        collectedThisMonth: 4500,
        pendingCollection: 1200,
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">
                    Welcome back,{" "}
                    {role === "teamLead" ? `${team} Lead` : role?.toUpperCase()}
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening with BC Pay today
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Violations
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.pendingViolations}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Collected This Month
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ৳{stats.collectedThisMonth}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Collection
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ৳{stats.pendingCollection}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {(role === "ceo" || role === "hr") && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Violations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ViolationList />
                        </CardContent>
                    </Card>
                    <Leaderboard />
                </div>
            )}

            {role === "teamLead" && (
                <TeamViolation />
            )}
        </div>
    );
}
