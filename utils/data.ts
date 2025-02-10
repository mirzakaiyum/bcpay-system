import fs from 'fs/promises';
import path from 'path';

const violationReportsPath = path.join(process.cwd(), 'public', 'data', 'violation-reports.json');

export async function getViolationReports() {
    const fileContent = await fs.readFile(violationReportsPath, 'utf-8');
    return JSON.parse(fileContent);
}

export async function saveViolationReport(newViolation: any) {
    const violations = await getViolationReports();
    violations.push(newViolation);
    await fs.writeFile(violationReportsPath, JSON.stringify(violations, null, 2), 'utf-8');
    return violations;
}
