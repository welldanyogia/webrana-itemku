import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import {NextResponse} from "next/server"; // Assuming auth logic is implemented here

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await auth(); // Fetch user data
        return NextResponse.json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ error: 'Failed to fetch user data' });
    }
}