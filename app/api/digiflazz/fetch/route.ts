import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchProducts } from '@/services/digiflazz';
import { getDigiAuth } from "@/data/digiflazz";
import crypto from 'crypto';
import { db } from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' });
    }

    try {
        const digiAuth = await getDigiAuth();
        if (!digiAuth) {
            return NextResponse.json({ error: 'Unable to fetch DigiAuth credentials' });
        }

        const { username, api_key } = digiAuth;
        // console.log('DigiAuth:', digiAuth);

        const sign = md5(username + api_key + "pricelist");
        // console.log("Generated sign:", sign);

        const products = await fetchProducts(username, sign);
        // console.log('Products:', products);

        const brandMap = new Map();
        for (const product of products) {
            if (!brandMap.has(product.brand)) {
                const brand = await db.brand.findUnique({
                    where: { code: product.brand },
                });
                brandMap.set(product.brand, brand?.mass_profit ?? 0);

            }
        }


        // Perform upsert operations within a transaction
        const savedProducts = await db.$transaction(
            products.map((product: any) => {
                const massProfit = brandMap.get(product.brand);
                const sellingPrice = product.price + (product.price * (massProfit / 100));

                // console.log("productbrand : ",product.brand)
                // console.log("massProfit : ",massProfit)
                // console.log("selling Price : ",sellingPrice)
                // console.log("productbrand mass : ",product.brand.mass_profit)
                return db.product.upsert({
                    where: { buyer_sku_code: product.buyer_sku_code },
                    update: {
                        product_name: product.product_name,
                        brand: {
                            connectOrCreate: {
                                where: { code: product.brand },
                                create: {
                                    brand_name: product.brand,
                                    category: {
                                        connectOrCreate: {
                                            where: { code: product.category },
                                            create: {
                                                category_name: product.category,
                                                code: product.category,
                                                category_status: true,
                                            },
                                        },
                                    },
                                    code: product.brand,
                                    brand_status: true,
                                },
                            },
                        },
                        type: {
                            connectOrCreate: {
                                where: { code: product.type },
                                create: {
                                    type_name: product.type,
                                    code: product.type,
                                    type_status: true,
                                },
                            },
                        },
                        seller_name: product.seller_name,
                        price: product.price,
                        selling_price: sellingPrice,
                        buyer_product_status: product.buyer_product_status,
                        seller_product_status: product.seller_product_status,
                        product_status: product.buyer_product_status && product.seller_product_status,
                        unlimited_stock: product.unlimited_stock,
                        stock: product.unlimited_stock ? 'unlimited' : product.stock.toString(),
                        multi: product.multi,
                        start_cut_off: product.start_cut_off,
                        end_cut_off: product.end_cut_off,
                        desc: product.desc,
                    },
                    create: {
                        product_name: product.product_name,
                        brand: {
                            connectOrCreate: {
                                where: { code: product.brand },
                                create: {
                                    brand_name: product.brand,
                                    category: {
                                        connectOrCreate: {
                                            where: { code: product.category },
                                            create: {
                                                category_name: product.category,
                                                code: product.category,
                                                category_status: true,
                                            },
                                        },
                                    },
                                    code: product.brand,
                                    brand_status: true,
                                },
                            },
                        },
                        type: {
                            connectOrCreate: {
                                where: { code: product.type },
                                create: {
                                    type_name: product.type,
                                    code: product.type,
                                    type_status: true,
                                },
                            },
                        },
                        seller_name: product.seller_name,
                        price: product.price,
                        selling_price: sellingPrice,
                        buyer_sku_code: product.buyer_sku_code,
                        buyer_product_status: product.buyer_product_status,
                        seller_product_status: product.seller_product_status,
                        product_status: product.buyer_product_status && product.seller_product_status,
                        unlimited_stock: product.unlimited_stock,
                        stock: product.unlimited_stock ? 'unlimited' : product.stock.toString(),
                        multi: product.multi,
                        start_cut_off: product.start_cut_off,
                        end_cut_off: product.end_cut_off,
                        desc: product.desc,
                    },
                });
            })
        );

        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error checking balance:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            return NextResponse.json({ error: error.response.data });
        } else {
            return NextResponse.json({success:false, error: 'Error checking balance' });
        }
    }
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ error: 'Method not allowed' });
    }

    try {
        const { category_id } = await req.json()
        // console.log(await req.json())
        // console.log(category_id)

        if (!category_id) {
            return NextResponse.json({ error: 'Missing buyer_sku_code' });
        }

        // Fetch brands associated with the category
        const brands = await db.brand.findMany({
            where: { category_id: category_id },
        });

        // Collect product deletion promises
        const deleteProductsPromises = brands.map(brand =>
            db.product.deleteMany({
                where: { brand_id: brand.brand_id },
            })
        );

        // Collect brand deletion promises
        const deleteBrandsPromise = db.brand.deleteMany({
            where: { category_id: category_id },
        });

        // Delete category
        const deleteCategoryPromise = db.category.delete({
            where: { category_id: category_id },
        });

        // Execute transaction
        const transaction = await db.$transaction([
            ...deleteProductsPromises,
            deleteBrandsPromise,
            deleteCategoryPromise,
        ]);

        return NextResponse.json({ success: true, category: transaction });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: error.message });
    }
}

// MD5 hashing function using Node.js crypto module
const md5 = (data: string) => {
    return crypto.createHash('md5').update(data).digest('hex');
};
