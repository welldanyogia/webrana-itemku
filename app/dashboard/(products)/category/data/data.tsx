import {CheckCircledIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon} from "@radix-ui/react-icons";
import {CrossIcon} from "lucide-react";
import {db} from "@/lib/db";

export const statuses = [
    { value: true, label: 'Active', icon: CheckCircledIcon },
    { value: false, label: 'Inactive', icon: CrossCircledIcon }
]

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

        return transformedCategories;
    } catch (error) {
        console.error(error);
        return null;
    }
};