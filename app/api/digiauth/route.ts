
import { NextRequest, NextResponse } from 'next/server';
import {db} from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const digiAuth = await db.digiAuth.findFirst({
            orderBy: {
                id: 'desc',
            },
        });
        return NextResponse.json(digiAuth);
    } catch (error : any) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}

export async function POST(req: NextRequest, res: Response) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }

    try {
        // Parse JSON from request body
        const { id, digi_balance, username, api_key } = await req.json();


        let result;

        // Validate required fields
        if (!username) {
            return NextResponse.json({ success: false, message: 'Username is required',data:req.json() });
        }

        // Use dbClient to update or create data in the database
        if (id !== null || id !== "undefined") {
            result = await db.digiAuth.update({
                where: { id },
                data: { digi_balance, username, api_key },
            });
        } else if (id === null || id === "undefined"){
            result = await db.digiAuth.create({
                data: { digi_balance, username, api_key },
            });
        }

        return NextResponse.json({ success: true, message: 'Data updated or created successfully', data: result });
    } catch (error : any) {
        console.error('Error updating or creating data:', error);
        return NextResponse.json({ success: false, message: 'Failed to update or create data' });
    }
}
