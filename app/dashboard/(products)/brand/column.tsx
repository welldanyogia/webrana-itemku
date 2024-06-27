"use client"
import {ColumnDef} from "@tanstack/react-table";
import {Transaction} from "@/app/dashboard/transactions/column";
import {Brand} from "@/app/dashboard/(products)/brand/data/schema";
import {DataTableColumnHeader} from "@/app/dashboard/transactions/components/data-table-column-header";
import {statuses, statusPayments} from "@/app/dashboard/transactions/data/data";
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


function getStatusClass(status: boolean) {
    switch (status) {
        case true:
            return "bg-emerald-500 text-white";
        case false:
            return "bg-destructive text-white";
        default:
            return "";
    }
}

export const columns: ColumnDef<Brand>[] = [
    {
        header: "No",
        cell: ({row}) => row.index + 1,
    },
    {
        accessorKey: "brand_name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Brand Name"/>
        ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const brand = row.original;
            return <span>{brand.category?.category_name}</span>;
        },
        filterFn: (row, id, value) => {
            const categoryName = row.getValue(id)?.category_name;
            return value.includes(categoryName);
        },
    },
    {
        accessorKey: "products",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Brand Products"/>
        ),
        cell: ({row}) => {
            const brand = row.original;
            return <span>{brand.products?.length}</span>;
        },
    },
    {
        accessorKey: "brand_status",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Brand Status"/>
        ),
        cell: ({row}) => {
            const brand = row.original;
            const currentStatus = statuses.find((status) => status.value === brand.brand_status);

            return (
                <Badge variant="outline"
                       className={`${getStatusClass(brand.brand_status)} capitalize`}>
                    {currentStatus && React.createElement(currentStatus.icon, {className: "mr-2"})}
                    {brand.brand_status ? "active" : "inactive"}
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
            const category = row.original;
            const formattedDate = format(new Date(category.updatedAt), "dd MMM yyyy HH:mm:ss", { locale: id });
            return <span>{formattedDate}</span>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="bg-emerald-500/50">
                        <CheckCircledIcon />
                    </Button>
                    <Button variant="ghost" className="bg-destructive" onClick={()=>{
                        handleDelete(category.category_id).then(r => console.log(r))
                        console.log("id : ",category.category_id,category.category_name)
                    }}>
                        <Trash2Icon className="w-4 h-4" />
                    </Button>
                </div>
            );
        },
    },

]