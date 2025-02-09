import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "./ui/card";
import violationData from "@/data/violation-reports.json";

export default function Leaderboard() {
    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter violations for current month
    const currentMonthViolations = violationData.filter((violation) => {
        const violationDate = new Date(violation.date);
        return (
            violationDate.getMonth() === currentMonth &&
            violationDate.getFullYear() === currentYear
        );
    });

    const contributorTotals = currentMonthViolations.reduce(
        (acc, violation) => {
            acc[violation.employee] =
                (acc[violation.employee] || 0) + violation.amount;
            return acc;
        },
        {} as Record<string, number>
    );

    const leaderboard = Object.entries(contributorTotals)
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1,
        }));

    const monthName = now.toLocaleString("default", { month: "long" });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                    {monthName} {currentYear}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Total Contribution (BDT)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboard.map((entry) => (
                            <TableRow key={entry.rank}>
                                <TableCell>{entry.rank}</TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.amount}</TableCell>
                            </TableRow>
                        ))}
                        {leaderboard.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No violations this month
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
