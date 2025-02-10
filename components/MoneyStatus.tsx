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
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
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
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    const toggleStatus = async (
        id: number,
        field: "collected" | "sentToFinance"
    ) => {
        const loadingKey = `${id}-${field}`;
        setLoading((prev) => ({ ...prev, [loadingKey]: true }));
        setError(null);

        try {
            const team = teams.find((team) => team.id === id);
            if (!team) throw new Error("Team not found");

            const newValue = !team[field];

            const response = await fetch("/api/money-collection", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, field, value: newValue }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            setTeams(
                teams.map((t) =>
                    t.id === id ? { ...t, [field]: newValue } : t
                )
            );
        } catch (error) {
            setError("Failed to update status. Please try again.");
            console.error("Error updating status:", error);
        } finally {
            setLoading((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Money Collection Status</CardTitle>
                {error && (
                    <div className="mt-2 p-2 text-sm text-red-600 bg-red-50 rounded">
                        {error}
                    </div>
                )}
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
                                        disabled={
                                            loading[`${team.id}-collected`]
                                        }
                                    >
                                        {loading[`${team.id}-collected`] ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : team.collected ? (
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
                                        disabled={
                                            !team.collected ||
                                            loading[`${team.id}-sentToFinance`]
                                        }
                                    >
                                        {loading[`${team.id}-sentToFinance`] ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : team.sentToFinance ? (
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
