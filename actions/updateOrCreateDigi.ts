"use server"
import { db } from "@/lib/db";

export const updateOrCreateDigi = async (values) => {
    const { id, username, api_key } = values;

    try {
        if (id !== null || true) {
            const upsertDigiAuth = await db.digiAuth.upsert({
                where: {
                    id: id,
                },
                update: {
                    username: username,
                    api_key: api_key,
                },
                create: {
                    username: username,
                    api_key: api_key,
                },
            });
        }else {
            const createDigiAuth = await db.digiAuth.create({
                data: {
                    username: username,
                    api_key: api_key,
                },
            });
        }

        return { success: "Data Saved!" };
    } catch (error) {
        console.error("Error updating or creating data:", error.message);
        throw new Error("Failed to update or create data.");
    }
};
