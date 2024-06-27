import { z } from 'zod';
import {brandSchema} from "@/app/dashboard/(products)/brand/data/schema";

// Define the schema for the Type object
export const typeSchema = z.object({
    type_id: z.string(),
    type_name: z.string(),
    type_status: z.boolean(),
    code: z.string(),
    createdAt: z.string(), // Assuming createdAt is a string representation of DateTime
    updatedAt: z.string(), // Assuming updatedAt is a string representation of DateTime
});

// Infer the Type type from the schema
export type Type = z.infer<typeof typeSchema>;

export const productSchema = z.object({
    id: z.number().int(),
    product_name: z.string(),
    brand_id: z.string().nullable(),
    brand: brandSchema.nullable(),
    type_id: z.string().nullable(),
    type: typeSchema.nullable(),
    seller_name: z.string(),
    price: z.number().int(),
    selling_price: z.number().int().default(0),
    profit: z.number(),
    buyer_sku_code: z.string(),
    product_status: z.boolean().nullable(),
    buyer_product_status: z.boolean(),
    seller_product_status: z.boolean(),
    unlimited_stock: z.boolean(),
    stock: z.string(),
    multi: z.boolean(),
    start_cut_off: z.string(),
    end_cut_off: z.string(),
    desc: z.string().nullable(),
    createdAt: z.string(), // Assuming createdAt is a string representation of DateTime
    updatedAt: z.string(), // Assuming updatedAt is a string representation of DateTime
});

// Infer the Product type from the schema
export type Product = z.infer<typeof productSchema>;