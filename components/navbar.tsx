import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const NavigationMenu = () => {
    return (
        <div className='flex justify-between px-10 py-2'>
            <div>
                <Link href={'/'}>
                    Webrana
                </Link>
            </div>
            <div className='flex gap-6'>
                <Link href={'/signin'} legacyBehavior>
                    <Button className='border-2' variant="outline">
                        Sign in
                    </Button>
                </Link>
                <Link href={'/signup'} legacyBehavior>
                    <Button>
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NavigationMenu;