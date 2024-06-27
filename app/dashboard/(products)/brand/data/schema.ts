import {any, z} from "zod";
import {categorySchema} from "@/app/dashboard/(products)/category/data/schema";

// Define the enum for ProcessedBy
const ProcessedBy = z.enum(["DIGIFLAZZ", "OTHER_ENUM_VALUE"]); // Add other enum values as needed

// Define the schema for a Brand object
export const brandSchema = z.object({
    brand_id: z.string(),
    brand_name: z.string(),
    image_url: z.string().nullable(), // Nullable string for image_url
    brand_status: z.boolean(),
    processed_by: ProcessedBy,
    category_id: z.string().nullable(), // Nullable string for category_id
    category: categorySchema.nullable(), // Nullable category
    mass_profit: z.number().nullable(), // Nullable number for mass_profit
    fee_itemku: z.number().nullable(), // Nullable number for mass_profit
    mass_profit_status: z.boolean(),
    code: z.string(),
    products: z.array(any()).nullable(),
    createdAt: z.string(), // Assuming createdAt is a string representation of DateTime
    updatedAt: z.string(), // Assuming updatedAt is a string representation of DateTime
});

// Infer the Brand type from the schema
export type Brand = z.infer<typeof brandSchema>;
