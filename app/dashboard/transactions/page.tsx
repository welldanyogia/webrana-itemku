import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import {auth, signOut} from "@/auth";

import {DataTable} from "@/app/dashboard/transactions/data-table";
import {columns,Transaction} from "@/app/dashboard/transactions/column";
import { promises as fs } from "fs"
import path from "path"
import {z} from "zod";
import {transactionSchema} from "@/app/dashboard/transactions/data/schema";
import {getAllTransactions} from "@/data/digiflazz";


async function getData() {
    const data = await fs.readFile(
        path.join(process.cwd(), "app/dashboard/transactions/data/transactions.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(transactionSchema).parse(tasks)
}
export default async function Home() {
    const user = await auth()
    const data = await getAllTransactions()

    return (
        <div className='w-full mt-6'>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
