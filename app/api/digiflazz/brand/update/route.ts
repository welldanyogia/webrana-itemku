import { NextApiRequest, NextApiResponse } from "next";
import { getBrandByID as fetchBrandByID } from "@/data/digiflazz";
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {Product} from "@prisma/client";

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const request = await req.json();

        // console.log(request)
        const updatedBrand = await db.brand.update({
            where:{
                brand_id:request.brandId
            },
            data:{
                mass_profit: request.mass_profit,
                mass_profit_status: request.mass_profit_status,
                fee_itemku: request.fee_itemku
            }
        })
        console.log(updatedBrand)
        if (updatedBrand.mass_profit_status) {
            const products = await db.product.findMany({
                where: {
                    brand_id: updatedBrand.brand_id
                }
            });

            const updatedProductsPromises = products.map((product:Product) => {
                const newSellingPrice = product.price + (product.price * (updatedBrand.mass_profit / 100));
                return db.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        selling_price: newSellingPrice
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);
            console.log("Updated Products: ", updatedProducts);
        }

        return NextResponse.json({ updatedBrand });
    } catch (e : any) {
        console.log("Error fetching brand data:", e.message);
        return NextResponse.json({ error: e.message });
    }
}
