import { NextApiRequest, NextApiResponse } from "next";
import { getBrandByID as fetchBrandByID } from "@/data/digiflazz";
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const request = await req.json();

        console.log(request);

        const { name, type, brand_id } = request;

        const form = await db.formInputBrand.create({
            data: {
                name: name,
                type: type,
                brand_id: brand_id
            }
        });


        // const forms = await db.formInputBrand.findMany()
        // // const brand = await fetchBrandByID(request.brandId); // Ensure you await the call
        // //
        // // if (!brand) {
        // //     return NextResponse.json({ error: "Brand not found" });
        // // }
        // console.log("forms : ",forms)

        return NextResponse.json({ form });
    } catch (e : any) {
        // console.log("Error fetching brand data:", e.message);
        return NextResponse.json({ error: e.message });
    }
}
