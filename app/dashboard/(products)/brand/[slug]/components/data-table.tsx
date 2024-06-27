"use client"
import {
    ColumnDef,
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import * as React from "react";
import {DataTableToolbar} from "@/app/dashboard/(products)/brand/[slug]/components/data-table-toolbar";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DataTablePagination} from "@/app/dashboard/(products)/brand/[slug]/components/data-table-pagination";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {LoadingCustom} from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [isLoading, setIsLoading] = React.useState(false);

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility
        },
    })
    const router = useRouter();

    const handleRowClick = (brand_id: string) => {
        router.push(`/dashboard/brand/${brand_id}`);
    };

    return (
        <div className='space-y-4 mt-6'>
            <Card>
                {/*<div className="flex items-center py-4">*/}
                <CardHeader className='space-y-2'>
                    <CardTitle>
                        Product
                    </CardTitle>
                    <CardDescription>
                        Manage your products
                    </CardDescription>
                    <DataTableToolbar table={table} isLoading={isLoading} setIsLoading={setIsLoading}/>
                </CardHeader>
                {/*</div>*/}
                {/*<div className="rounded-md border">*/}
                    <CardContent>
                        {
                            isLoading ? (
                                <LoadingCustom title={"Syncing"}/>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                        </TableHead>
                                                    )
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    // onClick={() => handleRowClick(row.original.brand_id)}
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    className="h-24 text-center"
                                                >
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )
                        }

                    </CardContent>
                {/*</div>*/}
                <CardFooter className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {table.getRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) total.
                    </div>
                    <DataTablePagination table={table}/>
                </CardFooter>
            </Card>
        </div>
    )
}