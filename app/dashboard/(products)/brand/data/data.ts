// import fs from 'fs/promises';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {db} from "@/lib/db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getCategoryName = async () => {
    try {
        const categories = await db.category.findMany({
            select: {
                category_name: true,
            },
        });

        // Log the fetched categories
        console.log(categories);

        // Transform the categories into the desired structure
        const transformedCategories = categories.map(category => ({
            value: category.category_name,
            label: category.category_name,
            icon: ""
        }));

        // Define the file path
        const filePath = path.join(process.cwd(), __dirname, 'categories.json');

        // Write the data to a JSON file
        await fs.writeFile(filePath, JSON.stringify(transformedCategories, null, 2));

        return transformedCategories;
    } catch (error : any) {
        console.error(error);
        return null;
    }
};
