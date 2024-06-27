import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {auth, signOut} from "@/auth";
import {handleSignOut} from "@/actions/signout";
import {db} from "@/lib/db";
import {GetServerSideProps} from "next";
import {getBrands, getCategoryName, getDigiAuth} from "@/data/digiflazz";
import React, {Suspense, useEffect, useState, useTransition} from "react";
import axios from "axios";
import {z} from "zod";
import {DigiAuthSchema, RegisterSchema} from "@/schemas";
import {register} from "@/actions/register";
import {updateOrCreateDigi} from "@/actions/updateOrCreateDigi";
import {FormError} from "@/components/form-error";
import Loading from "@/app/loading";
import {DataTable} from "@/app/dashboard/(products)/brand/components/data-table";
import {columns} from "@/app/dashboard/(products)/brand/column";


export default async function Home() {
    const data = await getBrands()
    const category = await getCategoryName()
    return (
        <div className='w-full'>
            <DataTable columns={columns} data={data}/>
        </div>
    );
}
