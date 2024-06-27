// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import crypto from 'crypto';
// import {NextRequest, NextResponse} from "next/server";
// import {db} from "@/lib/db";
// import {getDigiAuth} from "@/data/digiflazz";
//
// type RequestBody = {
//     username: string;
//     buyer_sku_code: string;
//     customer_no: string;
//     ref_id: string;
//     apiKey: string;
//     // testing?: boolean;
//     // max_price?: number;
//     // cb_url?: string;
//     // allow_dot?: boolean;
// };
//
// // type ResponseData = {
// //     data: {
// //         ref_id: string;
// //         customer_no: string;
// //         buyer_sku_code: string;
// //         message: string;
// //         status: string;
// //         rc: string;
// //         sn?: string;
// //         buyer_last_saldo?: number;
// //         price: number;
// //         tele?: string;
// //         wa?: string;
// //     };
// // };
//
// export async function POST(req: NextRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return NextResponse.json({ message: 'Method Not Allowed' });
//     }
//     const digiAuth = await getDigiAuth();
//     if (!digiAuth) {
//         return NextResponse.json({ error: 'Unable to fetch DigiAuth credentials' });
//     }
//
//     const { username, api_key } = digiAuth;
//
//     const {
//         buyer_sku_code,
//         customer_no,
//         ref_id,
//         // testing,
//         // max_price,
//         // cb_url,
//         // allow_dot,
//     }: RequestBody = req.json();
//
//     console.log(req.json())
//
//     const sign = crypto.createHash('md5').update(username + api_key + ref_id).digest('hex');
//
//     const requestBody = {
//         username,
//         buyer_sku_code,
//         customer_no,
//         ref_id,
//         sign,
//         // ...(testing !== undefined && { testing }),
//         // ...(max_price !== undefined && { max_price }),
//         // ...(cb_url !== undefined && { cb_url }),
//         // ...(allow_dot !== undefined && { allow_dot }),
//     };
//
//     try {
//         const response = await axios.post('https://api.digiflazz.com/v1/transaction', requestBody);
//
//         const { data } = response.data;
//
//         // Assuming you have methods to get the brand_id and product_id
//         const product = await db.product.findUnique({
//             where: { buyer_sku_code: data.buyer_sku_code },
//             include:{
//                 brand: true
//             }
//         });
//
//         if (!product) {
//             throw new Error('Product not found');
//         }
//
//         console.log("response : ",data.data)
//         console.log("product : ",product)
//
//         // const transaction = await db.transaction.create({
//         //     data: {
//         //         trx_id: data.ref_id,
//         //         buyer_sku_code: data.buyer_sku_code,
//         //         phone_number: data.customer_no,
//         //         product_brand: product.brand_id,
//         //         product_name: product.product_name,
//         //         amount: data.price,
//         //         status: data.status as any,
//         //         payment_method: 'Unknown', // You may need to fetch or provide this information
//         //         payment_name: 'Unknown', // You may need to fetch or provide this information
//         //         expired_time: new Date(), // You may need to calculate this
//         //         digiflazz_status: data.status,
//         //         data_trx: data,
//         //         product_price: data.price,
//         //         fee: 0, // You may need to calculate this
//         //         unique_code: 0, // You may need to calculate this
//         //         qty: 1,
//         //         product_id: product.id,
//         //         brand_id: product.brand_id,
//         //     },
//         // });
//
//         return NextResponse.json(req.json());
//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json({ message: 'Internal Server Error' });
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { getDigiAuth } from '@/data/digiflazz';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
    buyer_sku_code: string;
    customer_no: string;
};

export async function POST(req: NextRequest, res: NextApiResponse) {
    const digiAuth = await getDigiAuth();
    if (!digiAuth) {
        return NextResponse.json({ error: 'Unable to fetch DigiAuth credentials' });
    }

    const { username, api_key } = digiAuth;

    try {
        const { buyer_sku_code, customer_no }: RequestBody = await req.json();
        const ref_id = crypto.randomUUID();

        const sign = crypto.createHash('md5').update(username + api_key + ref_id).digest('hex');

        const requestBody = {
            username,
            buyer_sku_code,
            customer_no,
            ref_id,
            sign,
        };

        console.log("Request body to DigiFlazz:", requestBody);

        const response = await axios.post('https://api.digiflazz.com/v1/transaction', requestBody);
        const { data } = response.data;

        console.log("Response from DigiFlazz:", data);

        const product = await db.product.findUnique({
            where: { buyer_sku_code: data.buyer_sku_code },
            include: {
                brand: true
            }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        // Assuming further processing and creation of transaction
        const transaction = await db.transaction.create({
            data: {
                trx_id: data.ref_id,
                buyer_sku_code: data.buyer_sku_code,
                tujuan: data.customer_no,
                phone_number: data.customer_no,
                product_brand: product.brand.brand_name,
                product_name: product.product_name,
                amount: data.price,
                status: data.status as any,
                payment_method: 'Unknown', // You may need to fetch or provide this information
                payment_name: 'Unknown', // You may need to fetch or provide this information
                expired_time: new Date(), // You may need to calculate this
                digiflazz_status: data.status,
                data_trx: data,
                product_price: data.price,
                fee: 0, // You may need to calculate this
                unique_code: 0, // You may need to calculate this
                qty: 1,
                product_id: product.id,
                brand_id: product.brand_id,
            },
        });


        return NextResponse.json(transaction);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            return NextResponse.json({ message: 'Axios Error', error: error.response?.data || error.message });
        } else {
            console.error('Error:', error.message);
            return NextResponse.json({ message: 'Internal Server Error', error: error.message });
        }
    }
}
