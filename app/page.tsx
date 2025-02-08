import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import teams from "@/data/teams.json";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Welcome to BC Pay</CardTitle>
                    <CardDescription>
                        Please select your role to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Management</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/dashboard?role=ceo">
                                <Button className="w-full" variant="outline">
                                    CEO
                                </Button>
                            </Link>
                            <Link href="/dashboard?role=hr">
                                <Button className="w-full" variant="outline">
                                    HR
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Team Leads</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {teams.map((team) => (
                                <Link
                                    key={team.name}
                                    href={`/dashboard?role=teamLead&team=${team.name}`}
                                >
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        {team.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
