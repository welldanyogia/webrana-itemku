import {db} from "@/lib/db";

export const getDigiAuth = async () =>{
    try {
        const digiAuth = await db.digiAuth.findFirst({
            orderBy: {
                id: 'desc',
            },
            // take: 1,
        })
        // console.log(digiAuth)
        return digiAuth
    }catch {
        return null
    }
}

export const getDigiAuthByID = async (id: string) => {
    try {
        const digiAuth = await db.digiAuth.findUnique({
            where: {
                id,
            },
        });

        return digiAuth
    } catch {
        return null
    }
}

export const getCategory = async () =>{
    try {
        const category = await db.category.findMany({
            include: {
                brands: true,
            },
        })

        // console.log(category[0].brands.length)

        return category
    }catch {
        return null
    }
}

export const getCategoryName = async () =>{
    try {
        const category = await db.category.findMany({
            select: {
                category_name: true,
            },
        })

        console.log(category)

        return category
    }catch {
        return null
    }
}

export const getBrands = async () =>{
    try {
        const brands = await db.brand.findMany({

            include: {
                products: true,
                category:true,
            },
            orderBy:{
                    products:{
                        _count: 'desc'
                    }
                },
        })

        // console.log(brands)

        return brands
    }catch {
        return null
    }
}

export const getBrandByID = async (brand_id) =>{
    try {
        const brand = await db.brand.findFirst({
            where:{
                brand_id:brand_id
            },
            include: {
                products: {
                    orderBy: {
                        selling_price: 'asc',
                    },
                    include: {
                        type: true, // Include the type relation in products
                        brand: {
                            include:{
                                FormInputBrands: {
                                    include:{
                                        OptionSelectInputs: true
                                    },
                                    orderBy:{
                                        createdAt: 'asc'
                                    }
                                } // Ensure this is the correct relation name
                            }
                        }, // Include the brand relation in products
                    }
                },
                category: true,
                FormInputBrands: {
                    include:{
                        OptionSelectInputs: true
                    },
                    orderBy:{
                        createdAt: 'asc'
                    }
                } // Ensure this is the correct relation name
            },
        })

        console.log(brand)
        // console.log(category[0].brands.length)

        return brand
    }catch {
        return null
    }
}

export const getBrandName = async (brand_id)=>{
    try {
        const brand = await db.brand.findUnique({
            where: {
                brand_id: brand_id
            },
            select: {
                brand_name: true
            }
        })
        console.log(brand)
        return brand
    }catch (e : any) {

    }
}

export const getProducts = async (brand_id:string) =>{
    try {
        const products = await db.product.findMany({
            where:{
                brand_id: brand_id
            }
        })

        // console.log(category[0].brands.length)

        return products
    }catch {
        return null
    }
}

export const getFormsByBrandId = async (brand_id)=>{
    try {
        const forms = await db.formInputBrand.findMany({
            where:{
                brand_id: brand_id
            }
        })

        return forms
    }catch (e : any) {
        return null
    }
}

export const getAllTransactions = async () => {
    try {
        const transactions = await db.transaction.findMany()

        return transactions
    }catch (e : any) {
        return null
    }
}