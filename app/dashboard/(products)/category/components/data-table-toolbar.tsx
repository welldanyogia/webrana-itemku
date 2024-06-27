"use client";

import { Cross2Icon, SymbolIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statuses } from "../data/data";
import * as React from "react";
import {DataTableFacetedFilter} from "@/app/dashboard/(products)/category/components/data-table-faceted-filter";
import {DataTableViewOptions} from "@/app/dashboard/(products)/category/components/data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    isLoading : boolean,
    setIsLoading
}

export function DataTableToolbar<TData>({
                                            table,isLoading,setIsLoading
                                        }: DataTableToolbarProps<TData>) {
    // const [isLoading, setIsLoading] = React.useState(false);
    const isFiltered = table.getState().columnFilters.length > 0;

    const syncWithDigiflazz = async () => {
        setIsLoading(true)
        try {
            // Example fetch operation to Digiflazz API
            const response = await fetch("/api/digiflazz/fetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any necessary headers
                },
                // Add any payload or body data if required
            });

            if (!response.ok) {
                throw new Error("Failed to sync with Digiflazz");
            }

            console.log(response);
            // Optionally handle success response
        } catch (error : any) {
            console.error("Error syncing with Digiflazz:", error.message);
            // Optionally handle error state or notify user
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-between">
        {/*    <div className="flex flex-1 items-center space-x-2">*/}
        {/*        /!* <Input*/}
        {/*  placeholder="Filter tasks..."*/}
        {/*  value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}*/}
        {/*  onChange={(event) =>*/}
        {/*    table.getColumn("title")?.setFilterValue(event.target.value)*/}
        {/*  }*/}
        {/*  className="h-8 w-[150px] lg:w-[250px]"*/}
        {/*/> *!/*/}
        {/*        {table.getColumn("category_status") && (*/}
        {/*            <DataTableFacetedFilter*/}
        {/*                column={table.getColumn("category_status")}*/}
        {/*                title="Status"*/}
        {/*                options={statuses}*/}
        {/*            />*/}
        {/*        )}*/}
        {/*        /!* {table.getColumn("status_payment") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn("status_payment")}*/}
        {/*    title="Payment Status"*/}
        {/*    options={statusPayments}*/}
        {/*  />*/}
        {/*)} *!/*/}
        {/*        {isFiltered && (*/}
        {/*            <Button*/}
        {/*                variant="ghost"*/}
        {/*                onClick={() => table.resetColumnFilters()}*/}
        {/*                className="h-8 px-2 lg:px-3"*/}
        {/*            >*/}
        {/*                Reset*/}
        {/*                <Cross2Icon className="ml-2 h-4 w-4" />*/}
        {/*            </Button>*/}
        {/*        )}*/}
        {/*    </div>*/}
            <div className="flex flex-1 items-center space-x-2">
                <DataTableViewOptions table={table} />
                <Button
                    onClick={syncWithDigiflazz}
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                    disabled={isLoading} // Disable button while loading
                >
                    {/*{isLoading ? (*/}
                    {/*    <span className="flex items-center">*/}
                    {/*        <svg*/}
                    {/*            className="animate-spin h-4 w-4 mr-2"*/}
                    {/*            xmlns="http://www.w3.org/2000/svg"*/}
                    {/*            fill="none"*/}
                    {/*            viewBox="0 0 24 24"*/}
                    {/*        >*/}
                    {/*            <circle*/}
                    {/*                className="opacity-25"*/}
                    {/*                cx="12"*/}
                    {/*                cy="12"*/}
                    {/*                r="10"*/}
                    {/*                stroke="currentColor"*/}
                    {/*                strokeWidth="4"*/}
                    {/*            ></circle>*/}
                    {/*            <path*/}
                    {/*                className="opacity-75"*/}
                    {/*                fill="currentColor"*/}
                    {/*                d="M4 12a8 8 0 018-8v8z"*/}
                    {/*            ></path>*/}
                    {/*        </svg>*/}
                    {/*        Syncing...*/}
                    {/*    </span>*/}
                    {/*) : (*/}
                    {/*    <>*/}
                            <SymbolIcon className="mr-2 h-4 w-4" />
                            Sync with Digiflazz
                        {/*</>*/}
                    {/*)}*/}
                </Button>
            </div>
        </div>
    );
}
