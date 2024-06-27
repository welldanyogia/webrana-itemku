import { z } from "zod";

// Define the schema for a Category object
export const categorySchema = z.object({
    category_id: z.string(),
    category_name: z.string(),
    category_status: z.boolean(),
    code: z.string().nullable(), // Nullable string for code
    createdAt: z.string(), // Assuming createdAt is a string representation of DateTime
    updatedAt: z.string(), // Assuming updatedAt is a string representation of DateTime
});

// Infer the Category type from the schema
export type Category = z.infer<typeof categorySchema>;
