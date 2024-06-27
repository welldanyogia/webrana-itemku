import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import {getBrandByID, getBrandName} from "@/data/digiflazz";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const CustomBreadcrumb = () => {
    const pathname = usePathname(); // Mendapatkan pathname dari usePathname
    const pathSegments = pathname.split("/").filter(Boolean); // Memisahkan path menjadi segment-segment yang valid
    const [brand, setBrand] = useState<any>(null); // State untuk menyimpan data brand

    useEffect(() => {
        async function fetchBrand() {
            try {
                // Ambil brand_id dari pathSegments terakhir
                const brand_id = pathSegments[pathSegments.length - 1];
                if (
                    brand_id &&
                    brand_id !== "dashboard" &&
                    brand_id !== "brand"
                ) {
                    // Pastikan brand_id valid
                    const brandData = await getBrandName(brand_id); // Ambil brand berdasarkan brand_id
                    console.log("brand name : ", brandData)
                    setBrand(brandData); // Set data brand ke state
                }
            } catch (error : any) {
                console.error("Error fetching brand:", error);
            }
        }

        fetchBrand(); // Panggil fetchBrand ketika komponen dimount atau path berubah
    }, [pathname]);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    const href = "/" + pathSegments.slice(0, index + 1).join("/");
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <Fragment key={href}>
                            <BreadcrumbItem>
                                {!isLast ? (
                                    <BreadcrumbLink href={href} className="hover:underline capitalize">
                                        {segment}
                                    </BreadcrumbLink>
                                ) : (
                                    <span className="font-semibold capitalize">
                    {brand ? brand.brand_name : segment}
                  </span>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
