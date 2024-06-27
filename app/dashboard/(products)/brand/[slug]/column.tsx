"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/app/dashboard/(products)/brand/[slug]/data/schema";
import { DataTableColumnHeader } from "@/app/dashboard/(products)/brand/[slug]/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { OrderModal } from "@/components/order-modal";

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
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "product_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Name" />
        ),
    },
    {
        accessorKey: "brand",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand" />
        ),
        // cell: ({ row }) => {
        //     const product = row.original as Product;
        //     return <span>{product.brand?.brand_name ?? ""}</span>;
        // },
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        // cell: ({ row }) => {
        //     const product = row.original as Product;
        //     return <span>{product.type?.type_name ?? ""}</span>;
        // },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            return <span>{formatRupiah(product.price)}</span>;
        },
    },
    {
        accessorKey: "selling_price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Selling Price" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            return <span>{formatRupiah(product.selling_price)}</span>;
        },
    },
    {
        accessorKey: "fee_itemku",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fee Itemku" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            const feeItemku = product.brand?.fee_itemku ?? 0; // Default to 0 if fee_itemku is null or undefined
            const fee = (product.selling_price * feeItemku) / 100;
            return <span>{formatRupiah(fee)}</span>;
        },
    },
    {
        accessorKey: "profit",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Profit" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            const feeItemku = product.brand?.fee_itemku ?? 0; // Default to 0 if fee_itemku is null or undefined
            const fee = (product.selling_price * feeItemku) / 100;
            const profit = product.selling_price - product.price - fee;
            return <span>{formatRupiah(profit)}</span>;
        },
    },
    {
        accessorKey: "product_status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Status" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            return (
                <Badge variant="outline" className={`${getStatusClass(product.product_status)} capitalize`}>
                    {product.product_status ? "active" : "inactive"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Updated" />
        ),
        cell: ({ row }) => {
            const product = row.original as Product;
            const formattedDate = format(new Date(product.updatedAt), "dd MMM yyyy HH:mm:ss", { locale: id });
            return <span>{formattedDate}</span>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original as Product;
            return (
                <div className="flex items-center gap-2">
                    <OrderModal product={product} />
                </div>
            );
        },
    },
];
