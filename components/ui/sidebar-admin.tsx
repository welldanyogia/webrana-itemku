"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaChartBar } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import { VscSettings } from 'react-icons/vsc';

const SideBarAdmin = () => {
    const pathname = usePathname();
    const [activeAccordion, setActiveAccordion] = useState(null);

    const isActive = (path) => pathname === path;
    const isAnyActive = (paths) => paths.includes(pathname);

    const toggleAccordion = (accordion) => {
        setActiveAccordion(activeAccordion === accordion ? null : accordion);
    };

    return (
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
                <li>
                    <Link href="/dashboard">
                        <div
                            className={`flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                                isActive('/dashboard') ? 'bg-gray-200 text-blue-600' : 'bg-gray-100 text-neutral-700 hover:bg-gray-100'
                            } dark:bg-neutral-700 dark:text-white`}
                        >
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Dashboard
                        </div>
                    </Link>
                </li>

                <li className="hs-accordion" id="users-accordion">
                    <Link
                        className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                            isActive('/dashboard/transactions') ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                        } dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300`}
                        href={'/dashboard/transactions'}>
                        <FaChartBar />
                        Transaction
                    </Link>
                </li>

                <li className="hs-accordion" id="account-accordion">
                    <button
                        type="button"
                        onClick={() => toggleAccordion('account')}
                        className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                            isAnyActive(['/dashboard/product', '/dashboard/brand', '/dashboard/category']) || activeAccordion === 'account' ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                        } dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300`}
                    >
                        <AiOutlineProduct />
                        Product
                        <svg className={`hs-accordion-active:${activeAccordion === 'account' ? 'hidden' : 'block'} hidden ms-auto size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                        <svg className={`hs-accordion-active:${activeAccordion !== 'account' ? 'hidden' : 'block'} ms-auto size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    <div id="account-accordion-child" className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeAccordion === 'account' ? 'block' : 'hidden'}`}>
                        <ul className="pt-2 ps-2">
                            <li>
                                <Link href="/dashboard/category">
                                    <div
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                                            isActive('/dashboard/category') ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                                        } dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300`}
                                    >
                                        Category
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/brand">
                                    <div
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                                            isActive('/dashboard/brand') ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                                        } dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300`}
                                    >
                                        Brand
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/product">
                                    <div
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                                            isActive('/dashboard/product') ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                                        } dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300`}
                                    >
                                        Product
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="hs-accordion" id="projects-accordion">
                    <button
                        type="button"
                        onClick={() => toggleAccordion('projects')}
                        className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                            isAnyActive(['/dashboard/digiflazz']) || activeAccordion === 'projects' ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                        } dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300`}
                    >
                        <VscSettings />
                        Configuration
                        <svg className={`hs-accordion-active:${activeAccordion === 'projects' ? 'hidden' : 'block'} hidden ms-auto size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                        <svg className={`hs-accordion-active:${activeAccordion !== 'projects' ? 'hidden' : 'block'} ms-auto size-4`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    <div id="projects-accordion-child" className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeAccordion === 'projects' ? 'block' : 'hidden'}`}>
                        <ul className="pt-2 ps-2">
                            <li>
                                <Link href="/dashboard/digiflazz">
                                    <div
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg ${
                                            isActive('/dashboard/digiflazz') ? 'bg-gray-200 text-blue-600' : 'text-neutral-700 hover:bg-gray-100'
                                        } dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300`}
                                    >
                                        Digiflazz
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarAdmin;
