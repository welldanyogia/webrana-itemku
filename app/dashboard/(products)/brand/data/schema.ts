import { z } from "zod";
import { categorySchema } from "@/app/dashboard/(products)/category/data/schema";

// Define the enum for ProcessedBy
const ProcessedBy = z.enum(["DIGIFLAZZ", "OTHER_ENUM_VALUE"]); // Ganti dengan nilai enum yang sesuai

export const OptionSelectInputsSchema = z.object({
    id: z.string(),
    value: z.string(),
    name: z.string(),
    form_input_id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const FormInputBrandsSchema = z.object({
    form_input_id: z.string(),
    name: z.string(),
    type: z.string(),
    brand_id: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    OptionSelectInputs: z.array(OptionSelectInputsSchema).nullable(), // Menyesuaikan dengan struktur OptionSelectInputs
});

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
    fee_itemku: z.number().nullable(), // Nullable number for fee_itemku
    mass_profit_status: z.boolean(),
    code: z.string(),
    FormInputBrand: FormInputBrandsSchema.nullable(),
    products: z.array(z.any()).nullable(),
    createdAt: z.string(), // Assuming createdAt is a string representation of DateTime
    updatedAt: z.string(), // Assuming updatedAt is a string representation of DateTime
});

// Infer the Brand type from the schema
export type Brand = z.infer<typeof brandSchema>;
export type FormInputBrands = z.infer<typeof FormInputBrandsSchema>;
export type OptionSelectInput = z.infer<typeof OptionSelectInputsSchema>;
