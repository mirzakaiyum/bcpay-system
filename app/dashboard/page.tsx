"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ViolationList from "@/components/ViolationList";
import Leaderboard from "@/components/Leaderboard";
import TeamViolation from "@/components/TeamViolation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardContent() {
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") || "";
    const team = searchParams?.get("team") || "";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome back,{" "}
                        {role === "teamLead"
                            ? `${team} Lead`
                            : role?.toUpperCase()}
                    </h1>
                    <p className="text-muted-foreground">
                        Here's what's happening with BC Pay today
                    </p>
                </div>
                {role === "teamLead" && (
                    <Button>
                        <Link
                            href={`/dashboard/report-violation?${searchParams?.toString()}`}
                        >
                            Report Violation
                        </Link>
                    </Button>
                )}
                {role === "hr" && (
                    <Button>
                        <Link
                            href={`/dashboard/money-tracker?${searchParams?.toString()}`}
                        >
                            Track Money Collection
                        </Link>
                    </Button>
                )}
            </div>

            {(role === "ceo" || role === "hr") && (
                <>
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
                </>
            )}

            {role === "teamLead" && <TeamViolation />}
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense
            fallback={
                <div className="space-y-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="h-[300px] bg-gray-200 rounded"></div>
                            <div className="h-[300px] bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            }
        >
            <DashboardContent />
        </Suspense>
    );
}
