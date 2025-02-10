"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import violations from "@/data/violations.json";
import teams from "@/data/teams.json";

interface FormData {
    employee: string;
    violation: string;
    date: string;
}
interface ViolationReport {
    employee: string;
    team: string;
    violation: string | undefined;
    date: string;
    amount: number | undefined;
}

function ReportViolationContent({
    role,
    team,
}: {
    role: string;
    team: string;
}) {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        employee: "",
        violation: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const teamMembers = useMemo(() => {
        const currentTeam = teams.find((t) => t.name === team);
        return currentTeam?.members || [];
    }, [team]);

    useEffect(() => {
        if (role !== "teamLead") {
            router.push(`/dashboard`);
        }
    }, [role, router]);

    if (role !== "teamLead") return null;

    const isFormValid = () =>
        !!(formData.employee && formData.violation && formData.date);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!isFormValid()) return;

        setIsSubmitting(true);

        try {
            const selectedViolation = violations.find(
                (v) => v.id === formData.violation
            );
            const violationData: ViolationReport = {
                employee: formData.employee,
                team,
                violation: selectedViolation?.name,
                date: formData.date,
                amount: selectedViolation?.amount,
            };

            const response = await fetch("/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(violationData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Instead of redirecting:
            setSuccessMessage("Violation reported successfully.");
        } catch (error) {
            setError("Failed to report violation. Please try again.");
            console.error("Error reporting violation:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Report Violation for {team} Team</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-4 text-red-600 bg-red-50 rounded-md">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-4 text-green-600 bg-green-50 rounded-md">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="employee">Team Member</Label>
                            <Select
                                value={formData.employee}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        employee: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team member" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teamMembers.map((member) => (
                                        <SelectItem key={member} value={member}>
                                            {member}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="violation">Violation</Label>
                            <Select
                                value={formData.violation}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        violation: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select violation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {violations.map((violation) => (
                                        <SelectItem
                                            key={violation.id}
                                            value={violation.id}
                                        >
                                            {violation.name} (৳
                                            {violation.amount})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date of Violation</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        date: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !isFormValid()}
                        >
                            {isSubmitting
                                ? "Submitting..."
                                : "Report Violation"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function WrappedReportViolationContent() {
    const searchParams = useSearchParams();
    const role = searchParams?.get("role") || "";
    const team = searchParams?.get("team") || "";

    return <ReportViolationContent role={role} team={team} />;
}

export default function ReportViolationPage() {
    return (
        <Suspense fallback={<div>Loading search params...</div>}>
            <WrappedReportViolationContent />
        </Suspense>
    );
}
