"use client"
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell } from "@/components/ui/editable-cell";
import { DataTableColumnHeader } from "@/app/dashboard/transactions/components/data-table-column-header";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { statuses } from "@/app/dashboard/(products)/category/data/data";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import React from "react";


const handleDelete = async (category_id: string) => {
    try {
        const response = await fetch('/api/digiflazz/fetch', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_id: category_id }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error deleting product:', data.error);
        } else {
            console.log('Product deleted:', data.product);
            // Optionally, update the UI to remove the deleted product from the list
        }
    } catch (error :any) {
        console.error('Error deleting product:', error);
    }
};
export type Category = {
    category_id: string;
    category_name: string;
    category_status: boolean;
    brands: string;
    updatedAt: string;
};

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

export const columns = (
    updateData: (rowIndex: number, columnId: string, value: string) => void
): ColumnDef<Category>[] => [
    {
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "category_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category Name" />
        ),
        cell: ({ row, column }) => (
            <EditableCell
                value={row.original.category_name}
                row={row}
                column={column}
                updateData={updateData}
            />
        ),
    },
    {
        accessorKey: "brands",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category Brands" />
        ),
        cell: ({ row }) => {
            const category = row.original;
            return <span>{category.brands.length}</span>;
        },
    },
    {
        accessorKey: "category_status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category Status" />
        ),
        cell: ({ row }) => {
            const category = row.original;
            // const currentStatus = statuses.find((status) => status.value === category.category_status);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-24 p-0 capitalize">
                            <Badge variant="outline" className={`${getStatusClass(category.category_status)} capitalize`}>
                                {/*{currentStatus && React.createElement(currentStatus.icon, { className: "mr-2" })}*/}
                                {category.category_status ? "active" : "inactive"}
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {statuses
                            .filter((status) => status.value !== category.category_status)
                            .map((status, index) => (
                                <DropdownMenuItem key={index} onClick={() => console.log(`Status changed to ${status.value}`)}>
                                    <Badge variant="outline" className={getStatusClass(status.value)}>
                                        {React.createElement(status.icon, { className: "mr-2" })}
                                        {status.label}
                                    </Badge>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
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
];
