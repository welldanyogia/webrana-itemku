import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBalance } from '@/services/digiflazz';
import { getDigiAuth } from "@/data/digiflazz";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import {db} from "@/lib/db";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const digiAuth = await getDigiAuth();
            if (!digiAuth) {
                return NextResponse.json({ error: 'Unable to fetch DigiAuth credentials' });
            }

            const { username, api_key,id } = digiAuth;
            // console.log('DigiAuth:', digiAuth);
            // console.log('DigiAuth id:', digiAuth);

            // Generate the sign parameter using the required formula
            const sign = md5(username + api_key + "depo");
            // console.log("string : ",username + api_key + "depo")
            // console.log('Generated sign:', sign);



            const balanceResponse = await checkBalance(username, sign);
            // console.log('Balance Response:', balanceResponse);

            const updateBalance = await db.digiAuth.update({
                where:{
                    id: id
                },
                data:{
                    digi_balance: balanceResponse
                }
            })
            // console.log(updateBalance)
            return NextResponse.json(balanceResponse);
        } catch (error) {
            console.error('Error checking balance:', error);
            if (error.response) {
                // console.error('Response data:', error.response.data);
                // console.error('Response status:', error.response.status);
                return NextResponse.json({ error: error.response.data });
            } else {
                return NextResponse.json({ error: 'Error checking balance' });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' });
    }
}

// MD5 hashing function using Node.js crypto module
const md5 = (data: string) => {
    return crypto.createHash('md5').update(data).digest('hex');
};
// MD5 hashing function using Node.js crypto module

