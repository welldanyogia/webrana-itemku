import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {auth, signOut} from "@/auth";
import {handleSignOut} from "@/actions/signout";
import {db} from "@/lib/db";
import {GetServerSideProps} from "next";
import {getCategory, getDigiAuth} from "@/data/digiflazz";
import React, {Suspense, useEffect, useState, useTransition} from "react";
import axios from "axios";
import {z} from "zod";
import {DigiAuthSchema, RegisterSchema} from "@/schemas";
import {register} from "@/actions/register";
import {updateOrCreateDigi} from "@/actions/updateOrCreateDigi";
import {FormError} from "@/components/form-error";
import Loading from "@/app/loading";
import {promises as fs} from "fs";
import path from "path";
import {transactionSchema} from "@/app/dashboard/transactions/data/schema";
import {categorySchema} from "@/app/dashboard/(products)/category/data/schema";
import {DataTable} from "@/app/dashboard/(products)/category/components/data-table";
import {columns} from "@/app/dashboard/(products)/category/column";

async function getData() {
    const data = await fs.readFile(
        path.join(process.cwd(), "app/dashboard/(products)/category/data/categories.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(categorySchema).parse(tasks)
}
export default async function Home() {
    // const data = await getData()
    const category = await getCategory()
    // console.log(category)
    return (
        <div className='w-full'>
            <DataTable columns={columns} data={category} />
        </div>
    );
}
