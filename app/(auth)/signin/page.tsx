import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import FormSignin from "@/app/(auth)/signin/form";
import {LoginForm} from "@/components/auth/siginForm";
import React, {Suspense} from "react";

export default function Home() {
    return (
        <div className='w-full'>
            <Navbar/>
            <div className='grid grid-cols-2 max-md:flex max-sm:flex px-10 py-20 max-sm:px-2 mx-auto'>
                <div className='flex items-center max-md:hidden'><h1 className='font-extrabold mx-auto'>Webrana</h1></div>
                {/*<FormSignin/>*/}
                <LoginForm/>
            </div>
        </div>
    );
}
