import { LucideIcon, BarChart2, ClipboardList, AlertTriangle } from "lucide-react";

export type Role = 'teamLead' | 'hr' | 'ceo';

interface NavPath {
    path: string;
    label: string;
    icon: LucideIcon;
    roles: Role[];
}

export const navPaths: NavPath[] = [
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: BarChart2,
        roles: ['teamLead', 'hr', 'ceo']
    },
    {
        path: '/dashboard/report-violation',
        label: 'Report Violation',
        icon: ClipboardList,
        roles: ['teamLead']
    },
    {
        path: '/dashboard/money-tracker',
        label: 'Money Tracker',
        icon: AlertTriangle,
        roles: ['hr', 'ceo']
    }
];

export const getAuthorizedPaths = (role: Role | null) => 
    role ? navPaths.filter(path => path.roles.includes(role)) : [];