"use client"
import {ColumnDef} from "@tanstack/react-table";
import {Transaction} from "@/app/dashboard/transactions/column";
import {Brand} from "@/app/dashboard/(products)/brand/data/schema";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import React from "react";
import {format} from "date-fns";
import {id} from "date-fns/locale";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {Trash2Icon} from "lucide-react";
import {DataTableColumnHeader} from "@/app/dashboard/(products)/brand/[slug]/components/data-table-column-header";
import {statuses} from "@/app/dashboard/(products)/category/data/data";
import {Product} from "@/app/dashboard/(products)/brand/[slug]/data/schema";
import {OrderModal} from "@/components/order-modal";


function getStatusClass(status: boolean | null) {
    switch (status) {
        case true:
            return "bg-emerald-500 text-white";
        case false:
            return "bg-destructive text-white";
        default:
            return "";
    }
}

function formatRupiah(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount)
}


export const columns: ColumnDef<Product>[] = [
    {
        header: "No",
        cell: ({row}) => row.index + 1,
    },
    {
        accessorKey: "product_name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Product Name"/>
        ),
    },
    {
        accessorKey: "brand",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" />
        ),
        cell: ({ row }) => {
            const product = row.original;
            return <span>{product.brand?.brand_name}</span>;
        },
        filterFn: (row, id, value) => {
            const brandName = row.getValue(id)?.brand_name;
            return value.includes(brandName);
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
            const product = row.original;
            return <span>{product.type?.type_name}</span>;
        },
        filterFn: (row, id, value) => {
            const typeName = row.getValue(id)?.type_name;
            return value.includes(typeName);
        },
    },
    {
        accessorKey: "price",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Price"/>
        ),
        cell: ({row}) => {
            const product = row.original;
            return <span>{formatRupiah(product.price)}</span>;
        },
    },
    {
        accessorKey: "selling_price",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Selling Price"/>
        ),
        cell: ({row}) => {
            const product = row.original;
            return <span>{formatRupiah(product.selling_price)}</span>;
        },
    },
    {
        accessorKey: "fee_itemku",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Fee Itemku"/>
        ),
        cell: ({row}) => {
            const product = row.original;
            const fee = product.selling_price*(product.brand?.fee_itemku/100)
            return <span>{formatRupiah(fee)}</span>;
        },
    },
    {
        accessorKey: "profit",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Profit"/>
        ),
        cell: ({row}) => {
            const product = row.original;
            const fee = product.selling_price*(product.brand?.fee_itemku/100)
            const profit = product.selling_price-product.price-fee
            return <span>{formatRupiah(profit)}</span>;
        },
    },
    {
        accessorKey: "product_status",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Product Status"/>
        ),
        cell: ({row}) => {
            const product = row.original;
            const currentStatus = statuses.find((status) => status.value === product.product_status);

            return (
                <Badge variant="outline"
                       className={`${getStatusClass(product.product_status)} capitalize`}>
                    {currentStatus && React.createElement(currentStatus.icon, {className: "mr-2"})}
                    {product.product_status ? "active" : "inactive"}
                </Badge>

            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Updated" />
        ),
        cell: ({ row }) => {
            const product = row.original;
            const formattedDate = format(new Date(product.updatedAt), "dd MMM yyyy HH:mm:ss", { locale: id });
            return <span>{formattedDate}</span>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex items-center gap-2">
                    <OrderModal product={product}/>
                    {/*<Button variant="ghost" className="bg-emerald-500/50">*/}
                    {/*    <CheckCircledIcon />*/}
                    {/*</Button>*/}
                    {/*<Button variant="ghost" className="bg-destructive" onClick={()=>{*/}
                    {/*    handleDelete(category.category_id).then(r => console.log(r))*/}
                    {/*    console.log("id : ",category.category_id,category.category_name)*/}
                    {/*}}>*/}
                    {/*    <Trash2Icon className="w-4 h-4" />*/}
                    {/*</Button>*/}
                </div>
            );
        },
    },

]