import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";
import FormSignin from "@/app/(auth)/signin/form";
import FormSignup from "@/app/(auth)/signup/form";
import {RegisterForm} from "@/components/auth/sigupForm";

export default function Home() {
    return (
        <div className='w-full'>
            <Navbar/>
            <div className='grid grid-cols-2 px-10 py-20'>
                <div className='flex items-center'><h1 className='font-extrabold mx-auto'>Webrana</h1></div>
                {/*<FormSignup/>*/}
                <RegisterForm/>
            </div>
        </div>
    );
}
