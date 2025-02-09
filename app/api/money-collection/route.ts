import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const collectionPath = path.join(process.cwd(), 'data', 'money-collection.json');

export async function PATCH(request: Request) {
    try {
        const { id, field, value } = await request.json();
        
        const data = await fs.readFile(collectionPath, 'utf-8');
        const collections = JSON.parse(data);
        
        const updatedCollections = collections.map((item: any) => 
            item.id === id ? { ...item, [field]: value } : item
        );
        
        await fs.writeFile(
            collectionPath, 
            JSON.stringify(updatedCollections, null, 2)
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating money collection:', error);
        return NextResponse.json(
            { error: 'Failed to update status' },
            { status: 500 }
        );
    }
}
