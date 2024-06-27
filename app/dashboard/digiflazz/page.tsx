"use client"

import React, {Suspense, useEffect, useState, useTransition} from "react";
import axios from "axios";
import {z} from "zod";
import {DigiAuthSchema, RegisterSchema} from "@/schemas";
import {register} from "@/actions/register";
import {updateOrCreateDigi} from "@/actions/updateOrCreateDigi";
import {FormError} from "@/components/form-error";
import Loading from "@/app/loading";
import * as os from "os";

export default function Home() {
    const [isPending, startTransition] = useTransition()
    const [error,setError] = useState()
    const [values, setValues] = useState({
        id: '',
        digi_balance: '',
        username: '',
        api_key: ''
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/digiauth');
                const data = await response.data;
                console.log(data)
                setValues({
                    id: data?.id,
                    digi_balance: data?.digi_balance,
                    username: data?.username,
                    api_key: data?.api_key
                });
            } catch (error) {
                setError(error.message)
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const [serverIP, setServerIP] = useState(null);

    useEffect(() => {
        const fetchServerIP = async () => {
            try {
                const response = await fetch('/api/ipaddress',{
                    method:'POST'
                });
                const data = await response.json();
                // console.log(data)
                setServerIP(data.serverIP);
            } catch (error) {
                console.error('Error fetching server IP:', error);
            }
        };

        fetchServerIP();
    }, []);

    console.log("ip: ",serverIP)

    const handleSubmit = async (event) => {
        event.preventDefault();
        startTransition(() => {
            updateOrCreateDigi(values)
        })
    };


    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    return (
        <div className='w-full'>
            {/*{digiAuth}*/}
            {/*<!-- Card Section */}
            <div className="max-w-4xl text-black dark:text-white px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                {/*<!-- Card */}
                <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Digiflazz
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}
                    >
                        {/*<!-- Grid */}
                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="af-account-full-name"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Saldo Digiflazz
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Saldo Digiflazz anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex text-neutral-800 dark:text-white">
                                    Rp. {values?.digi_balance}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="af-account-full-name"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Saldo Digiflazz
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Saldo Digiflazz anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex text-neutral-800 dark:text-white">
                                    {serverIP}
                                </div>
                            </div>

                            {/*Username*/}
                            {/*<!-- End Col */}
                            <div className="sm:col-span-3">
                                <label htmlFor="username_digiflazz"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Username
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      Username Digiflazz anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            {/*API Key*/}
                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="username" type="text"
                                           onChange={handleChange}
                                           value={values?.username}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="Username Digiflazz"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-3">
                                <label htmlFor="api_key_digiflazz"
                                       className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    API Key
                                </label>
                                <div className="hs-tooltip inline-block">
                                    <button type="button" className="hs-tooltip-toggle ms-1">
                                        <svg className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                                             xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path
                                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </button>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                        role="tooltip">
                                      API Key Digiflazz anda
                                    </span>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input id="api_key" type="text"
                                           onChange={handleChange}
                                           value={values?.api_key}
                                           className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                           placeholder="API Key Digiflazz"/>
                                </div>
                            </div>
                            {/*<!-- End Col */}

                        </div>
                        {/*<!-- End Grid */}
                        <div className="mt-5 flex justify-end gap-x-2">
                            <button type="submit"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
                {/*<!-- End Card */}
            </div>
            {/*<!-- End Card Section */}
        </div>
    );
}
