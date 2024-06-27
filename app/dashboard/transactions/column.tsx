"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown,MoreHorizontal} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTableColumnHeader} from "@/app/dashboard/transactions/components/data-table-column-header";
import {statuses, statusPayments} from "@/app/dashboard/transactions/data/data";
import React from "react";

const getStatusClass = (status: string) => {
    switch (status) {
        case 'pending':
        case 'unpaid':
        case 'Pending':
            return 'bg-yellow-500 text-white'
        case 'process':
        case 'processing':
            return 'bg-blue-500 text-white'
        case 'success':
        case 'Sukses':
        case 'paid':
            return 'bg-emerald-500 text-white'
        case 'failed':
        case 'expired':
        case 'refund':
        case 'Gagal':
        // case 'fai':
            return 'bg-destructive text-white'
        default:
            return ''
    }
}


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
    id: string
    tujuan: string
    phone_number: string
    product_brand: string
    product_name: string
    amount: number
    status: "pending" | "process" | "success" | "failed"
    status_payment: "PAID" | "FAILED" | "EXPIRED" | "REFUND" | "UNPAID"
    digiflazz_status: string
    product_price: number
}

export const columns: ColumnDef<Transaction>[] = [
    {
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "trx_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transaction ID" />
        ),
    },
    {
        accessorKey: "tujuan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tujuan" />
        ),
    },
    {
        accessorKey: "phone_number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
    },
    {
        accessorKey: "product_brand",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Brand" />
        ),
    },
    {
        accessorKey: "product_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Name" />
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transaction Status" />
        ),
        cell: ({ row }) => {
            const transaction = row.original
            const currentStatus = statuses.find((status) => status.value === transaction.status);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-24 p-0 capitalize">
                            <Badge variant="outline" className={getStatusClass(transaction.status)}>
                                {
                                    currentStatus && React.createElement(currentStatus.icon, { className: "mr-2" })
                                }
                                {transaction.status}
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {statuses
                            .filter((status) => status.value !== transaction.status)
                            .map((status) => (
                            <DropdownMenuItem key={status.value} onClick={() => console.log(`Status changed to ${status.value}`)}>
                                <Badge variant="outline" className={getStatusClass(status.value)}>
                                    {React.createElement(status.icon, { className: "mr-2" })}
                                    {status.label}
                                </Badge>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "digiflazz_status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Digiflazz Status" />
        ),
        cell: ({ row }) => {
            const transaction = row.original
            return <Badge variant="outline" className={`${getStatusClass(transaction.digiflazz_status)} capitalize`}>
                {transaction.digiflazz_status}
            </Badge>
        },
    },
    {
        accessorKey: "product_price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Price" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("product_price"))
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
]
