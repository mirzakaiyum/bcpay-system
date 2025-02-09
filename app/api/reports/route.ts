import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const violationReportsPath = path.join(process.cwd(), 'data', 'violation-reports.json');

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        let reports: any[] = [];
        try {
            const fileContent = await fs.readFile(violationReportsPath, 'utf-8');
            reports = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist or is empty, will use empty array
        }
        
        // Generate new ID
        const lastId = reports.length > 0 ? reports[reports.length - 1].id : 0;
        const newId = lastId + 1;
        
        // Add new report
        const newReport = {
            id: newId,
            ...data
        };
        
        reports.push(newReport);
        
        // Save back to file
        await fs.writeFile(
            violationReportsPath,
            JSON.stringify(reports, null, 2)
        );
        
        return NextResponse.json({ success: true, report: newReport });
    } catch (error) {
        console.error('Error updating violation reports:', error);
        return NextResponse.json(
            { error: 'Failed to save violation report' },
            { status: 500 }
        );
    }
}
