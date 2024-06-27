import { NextApiRequest, NextApiResponse } from "next";
import { getBrandByID as fetchBrandByID } from "@/data/digiflazz";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const request = await req.json();
        const brand = await fetchBrandByID(request.brandId); // Ensure you await the call

        if (!brand) {
            return NextResponse.json({ error: "Brand not found" });
        }

        return NextResponse.json({ brand });
    } catch (e) {
        // console.log("Error fetching brand data:", e.message);
        return NextResponse.json({ error: e.message });
    }
}
