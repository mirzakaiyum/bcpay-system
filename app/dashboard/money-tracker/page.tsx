'use client';
import MoneyStatus from "@/components/MoneyStatus";
import { useSearchParams } from "next/navigation";

export default function MoneyTrackerPage() {
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") ?? "";

    return (
        <div className="mx-auto">
            {role === "hr" && <MoneyStatus />}
        </div>
    );
}