"use client";

import { Cross2Icon, SymbolIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { statuses } from "../../category/data/data";
import * as React from "react";
import { DataTableFacetedFilter } from "@/app/dashboard/(products)/category/components/data-table-faceted-filter";
import { DataTableViewOptions } from "@/app/dashboard/(products)/category/components/data-table-view-options";
import { useState } from "react";
import { GetStaticProps } from "next";
import { getCategoryName } from "@/data/digiflazz";

export const getStaticProps: GetStaticProps = async () => {
    const categories = await getCategoryName();
    console.log("categories : ", categories);

    return {
        props: {
            categories,
        },
    };
};

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    // categories: { category_id: string; category_name: string; category_status: string; code: string; createdAt: string; updatedAt: string; }[];
}

export function DataTableToolbar<TData>({
                                            table,
                                            isLoading,
                                            setIsLoading,
                                        }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;


    // Extract unique categories from the table data
    const uniqueCategories = React.useMemo(() => {
        const categoryColumn = table.getColumn("category");
        if (!categoryColumn) return [];

        const categoryValues = new Set(
            table.getPreFilteredRowModel().rows.map((row) => row.getValue("category")?.category_name)
        );

        return Array.from(categoryValues).map((category) => ({
            label: category,
            value: category,
            icon: "",
        }));
    }, [table]);

    console.log("Unique categories : ", uniqueCategories);

    const syncWithDigiflazz = async () => {
        setIsLoading(true);
        try {
            // Example fetch operation to Digiflazz API
            const response = await fetch("/api/digiflazz/fetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to sync with Digiflazz");
            }

            console.log(response);
        } catch (error : any) {
            console.error("Error syncing with Digiflazz:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {table.getColumn("brand_status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("brand_status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {table.getColumn("category") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("category")}
                        title="Category"
                        options={uniqueCategories}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex flex-1 items-center space-x-2">
                <DataTableViewOptions table={table} />
                <Button
                    onClick={syncWithDigiflazz}
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                    disabled={isLoading}
                >
                    <SymbolIcon className="mr-2 h-4 w-4" />
                    Sync with Digiflazz
                </Button>
            </div>
        </div>
    );
}
