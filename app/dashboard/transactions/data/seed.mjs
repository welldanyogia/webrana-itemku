import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transactions = Array.from({ length: 100 }, () => ({
    id: `TRANS-${faker.number.int({ min: 1000, max: 9999 })}`,
    user_id: `USER-${faker.number.int({ min: 1000, max: 9999 })}`,
    phone_number: faker.phone.number(),
    product_brand: faker.company.name(),
    product_name: faker.commerce.productName(),
    amount: faker.number.int({min:10000, max:1000000}),
    status: faker.helpers.arrayElement(["pending", "process", "success", "failed"]),
    status_payment: faker.helpers.arrayElement(["PAID", "FAILED", "EXPIRED", "REFUND", "UNPAID"]),
    digiflazz_status: faker.helpers.arrayElement(["pending", "process", "success", "failed"]),
    product_price: faker.number.int({min:10000, max:1000000}),
}));

fs.writeFileSync(
    path.join(__dirname, "transactions.json"),
    JSON.stringify(transactions, null, 2)
);

console.log("✅ Transactions data generated.");
