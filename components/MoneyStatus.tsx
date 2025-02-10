"use client";

import { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import MoneyCollection from "@/public/data/money-collection.json";

interface TeamStatus {
    id: number;
    name: string;
    amount: number;
    collected: boolean;
    sentToFinance: boolean;
}

function MoneyStatusContent() {
    const [teams, setTeams] = useState<TeamStatus[]>(MoneyCollection);

    const toggleStatus = (id: number, field: "collected" | "sentToFinance") => {
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === id ? { ...team, [field]: !team[field] } : team
            )
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Money Collection Status</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Team</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Collected</TableHead>
                            <TableHead>Sent to Finance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.name}</TableCell>
                                <TableCell>৳{team.amount}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            toggleStatus(team.id, "collected")
                                        }
                                    >
                                        {team.collected ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            toggleStatus(
                                                team.id,
                                                "sentToFinance"
                                            )
                                        }
                                        disabled={!team.collected}
                                    >
                                        {team.sentToFinance ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function MoneyStatus() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MoneyStatusContent />
        </Suspense>
    );
}
