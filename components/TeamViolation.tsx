"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import violationReports from "@/data/violation-reports.json";

function TeamViolationContent() {
    const searchParams = useSearchParams();
    const team = searchParams ? searchParams.get("team") : null;

    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const teamViolations = violationReports.filter((violation) => {
        const violationDate = new Date(violation.date);
        return (
            violation.team === team &&
            violationDate.getMonth() === currentMonth &&
            violationDate.getFullYear() === currentYear
        );
    });

    const totalAmount = teamViolations.reduce(
        (sum, violation) => sum + violation.amount,
        0
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{team} Team Violations</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
                <div className="text-sm text-muted-foreground">
                    Total Amount:{" "}
                    <span className="font-semibold">{totalAmount} BDT</span>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Violation</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount (BDT)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamViolations.map((violation) => (
                            <TableRow key={violation.id}>
                                <TableCell>{violation.employee}</TableCell>
                                <TableCell>{violation.violation}</TableCell>
                                <TableCell>
                                    {formatDate(violation.date)}
                                </TableCell>
                                <TableCell>{violation.amount}</TableCell>
                            </TableRow>
                        ))}
                        {teamViolations.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-muted-foreground"
                                >
                                    No violations reported for this month
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function TeamViolation() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TeamViolationContent />
        </Suspense>
    );
}
