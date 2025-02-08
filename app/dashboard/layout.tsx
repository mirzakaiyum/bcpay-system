import type React from "react"; // Import React

export const metadata = {
    title: "BC Pay System",
    description: "Benevolent Contribution Pay System",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-100">
                    <nav className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            BC Pay
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
