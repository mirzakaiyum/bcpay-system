"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useViolationStore } from "@/store/violationStore";

interface Violation {
    employee: string;
    team: string;
    violation: string | undefined;
    date: string;
    amount: number | undefined;
}

interface ViolationListProps {
    groupByTeam?: boolean;
}

export default function ViolationList({
    groupByTeam = false,
}: ViolationListProps) {
    const violations = useViolationStore((state) => state.violations);
    const sortedViolations = [...violations]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    if (!groupByTeam) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Rule Violated</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount (BDT)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedViolations.map((violation, index) => (
                        <TableRow key={index}>
                            <TableCell>{violation.employee}</TableCell>
                            <TableCell>{violation.violation}</TableCell>
                            <TableCell>{violation.date}</TableCell>
                            <TableCell>{violation.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    const groupedViolations = sortedViolations.reduce((groups, violation) => {
        const group = groups[violation.team] || [];
        group.push(violation);
        groups[violation.team] = group;
        return groups;
    }, {} as Record<string, Violation[]>);

    return (
        <div className="space-y-6">
            {Object.entries(groupedViolations).map(([team, teamViolations]) => (
                <Card key={team}>
                    <CardHeader>
                        <CardTitle>{team} Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Rule Violated</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount (BDT)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamViolations.map((violation, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {violation.employee}
                                        </TableCell>
                                        <TableCell>
                                            {violation.violation}
                                        </TableCell>
                                        <TableCell>{violation.date}</TableCell>
                                        <TableCell>
                                            {violation.amount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
