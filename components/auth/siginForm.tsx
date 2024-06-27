"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";
import {useState, useTransition} from "react";
import {FcGoogle} from "react-icons/fc";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error,setError]= useState<string | undefined>("")
    const [success,setSuccess]= useState<string | undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
        setError("")
        setSuccess("")
        startTransition(()=>{
            login(values)
                .then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        })
    }
    return (
        <div
            className="mt-7 bg-white max-md:mx-auto max-md:w-full max-sm:w-full max-sm:mx-auto border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account yet?
                        <Link className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                              href="/signup">
                            Sign up here
                        </Link>
                    </p>
                </div>
                <div className="mt-5 space-y-4">
                    <button type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                        <FcGoogle className={'w-4'}/>
                        Sign in with Google
                    </button>

                    <button type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                        <GitHubLogoIcon className={'w-4'}/>
                        Sign in with Github
                    </button>

                    <div
                        className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className='space-y-6'>
                            <div className='space-y-4'>
                                <FormField control={form.control}
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormLabel>Email</FormLabel>
                                                   <FormControl>
                                                       <Input disabled={isPending} type="email"
                                                              placeholder="email@example.com" {...field} />
                                                   </FormControl>
                                                   <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                               </FormItem>
                                           )}
                                           name='email'
                                />
                                <FormField control={form.control}
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormLabel>Password</FormLabel>
                                                   <FormControl>
                                                       <Input disabled={isPending} type="password"
                                                              placeholder="Password" {...field} />
                                                   </FormControl>
                                                   <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                               </FormItem>
                                           )}
                                           name='password'
                                />
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <Button type='submit' className='w-full' disabled={isPending}>
                                Sign in
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
