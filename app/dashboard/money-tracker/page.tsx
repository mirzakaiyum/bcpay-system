"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MoneyStatus from "@/components/MoneyStatus";

function MoneyTrackerContent() {
    const searchParams = useSearchParams();
    const role = searchParams?.get("role");

    if (role !== "hr") {
        return <div>Unauthorized access</div>;
    }

    return <MoneyStatus />;
}

export default function MoneyTracker() {
    return (
        <Suspense
            fallback={
                <div className="animate-pulse">
                    <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                </div>
            }
        >
            <MoneyTrackerContent />
        </Suspense>
    );
}
