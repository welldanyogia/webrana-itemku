"use client";

import React, {useState, useEffect} from "react";
import axios from "axios";
import {LoadingCustom} from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";
import {BrandDetail} from "@/app/dashboard/(products)/brand/[slug]/components/brand-detail";
import {DataTable} from "@/app/dashboard/(products)/brand/[slug]/components/data-table";
import {columns} from "@/app/dashboard/(products)/brand/[slug]/column";
import {getBrandByID} from "@/app/api/digiflazz/brand";


export default function Home({params}: { params: { slug: string } }) {
    const [brand, setBrand] = useState<any>(null);
    const [values, setValues] = useState({
        mass_profit: null,
        fee_itemku: null,
        mass_profit_status: false
    });
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const fetchBrand = async () => {
        try {
            const data = await getBrandByID(params.slug);
            if (data) {
                setBrand(data);
                setValues({
                    mass_profit: data.mass_profit || null,
                    fee_itemku: data.fee_itemku || null,
                    mass_profit_status: data.mass_profit_status || false
                });
                setIsSwitchOn(data.mass_profit_status || false);
            } else {
                console.error("No brand found with the given ID");
            }
        } catch (error) {
            console.error("Error fetching brand data:", error);
        }
    };

    useEffect(() => {
        fetchBrand();
    }, [params.slug]);

    // Effect to update input value when mass_profit changes
    useEffect(() => {
        // Only update if mass_profit is a valid number
        if (typeof values.mass_profit === 'number' && !isNaN(values.mass_profit) &&
            typeof values.fee_itemku === 'number' && !isNaN(values.fee_itemku)) {
            setValues(prevValues => ({
                ...prevValues,
                mass_profit: values.mass_profit,
                fee_itemku: values.fee_itemku
            }));
        }
    }, [values.mass_profit, values.fee_itemku]);

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
        setValues(prevValues => ({
            ...prevValues,
            mass_profit_status: checked
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseFloat(e.target.value);
        let key = e.target.id
        // Validate input value
        if (isNaN(inputValue) || inputValue < 0) {
            inputValue = 0;
        } else if (inputValue > 100) {
            inputValue = 100;
        }

        setValues(prevValues => ({
            ...prevValues,
            [key]: inputValue
        }));
    };

    // console.log("values : ", values)

    if (!brand) {
        return (
            <LoadingCustom title={"Loading"}/>
        );
    }

    return (
        <div>
            <BrandDetail brand={brand} onSuccess={fetchBrand}
                         handleInputChange={handleInputChange}
                         handleSwitchChange={handleSwitchChange}
                         values={values} isSwitchOn={isSwitchOn}/>
            <DataTable columns={columns} data={brand.products}/>
        </div>
    );
}
