"use client";

import { useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import MoneyCollection from "@/data/money-collection.json";

export default function MoneyStatus() {
    const [teams, setTeams] = useState(MoneyCollection);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    const toggleStatus = async (
        id: number,
        field: "collected" | "sentToFinance"
    ) => {
        const loadingKey = `${id}-${field}`;
        setLoading((prev) => ({ ...prev, [loadingKey]: true }));

        try {
            const newValue = !teams.find((team) => team.id === id)?.[field];

            const response = await fetch("/api/money-collection", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, field, value: newValue }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            setTeams(
                teams.map((team) =>
                    team.id === id ? { ...team, [field]: newValue } : team
                )
            );

            toast({
                title: "Status Updated",
                description: `Successfully updated ${field} status for ${
                    teams.find((t) => t.id === id)?.name
                }`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update status. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading((prev) => ({ ...prev, [loadingKey]: false }));
        }
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
