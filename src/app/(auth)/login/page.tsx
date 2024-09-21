import ProviderLogin from "@/app/_components/ProviderLogin";
import Form from "@/app/_components/Form";
import ThemeToggle from "@/app/_components/theme-toggle";
import React from "react";
import Link from "next/link";

const Page = () => {
    return (
        <div className=" bg-gray-100 text-gray-900 flex justify-center dark:bg-[#18181B] dark:text-white ">
            <div className="max-w-screen-xl m-0 sm:m-10 md:m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1 dark:bg-[#18181B] dark:text-white">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-1 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold flex gap-4">
                            Login <ThemeToggle />
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <ProviderLogin />

                            <div className="my-8 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 dark:bg-[#18181B] dark:text-white">
                                    Or Login with E-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <Form type="login" />
                                <Link href={"/signup"} >
                                <p
                                className="text-sm ml-2 mt-2 hover:text-white text-gray-600 "
                                >
                                   {`If you don't have an account, click here to Signup`}

                                </p>
                                </Link>
                                <p className="mt-2 text-xs text-gray-600 text-center gap-1 ml-6 flex ">
                                    I agree all
                                    <span className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </span>
                                    and its
                                    <span className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-[90vh] rounded mt-10 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-1 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/hero.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Page;
