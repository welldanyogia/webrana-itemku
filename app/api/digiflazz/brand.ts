import axios from "axios";

export async function getBrandByID(slug: string) {
    try {
        const response = await axios.post(`/api/digiflazz/brand`, {
            brandId: slug
        });
        if (response.status === 200) {
            return response.data.brand;
        } else {
            console.error("Failed to fetch brand data:", response.status, response.statusText);
            return null;
        }
    } catch (error : any) {
        console.error("Error fetching brand data:", error);
        return null;
    }
}