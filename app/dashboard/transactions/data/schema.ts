import { z } from "zod"

// Define the schema for a Payment object
export const transactionSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    phone_number: z.string(),
    product_brand: z.string(),
    product_name: z.string(),
    amount: z.number(),
    status: z.enum(["pending", "process", "success", "failed"]),
    status_payment: z.enum(["PAID", "FAILED", "EXPIRED", "REFUND", "UNPAID"]),
    digiflazz_status: z.string(),
    product_price: z.number(),
})

// Infer the Payment type from the schema
export type Payment = z.infer<typeof transactionSchema>
