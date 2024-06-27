import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate random categories
const categories = Array.from({ length: 10 }, () => ({
    category_id: faker.datatype.uuid(),
    category_name: faker.commerce.department(),
    category_status: faker.datatype.boolean(),
    code: faker.helpers.slugify(faker.commerce.department()),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
}));

fs.writeFileSync(
    path.join(__dirname, "categories.json"),
    JSON.stringify(categories, null, 2)
);

console.log("✅ Categories data generated.");