'use client'
import React, { useState } from "react";
import ThemeToggle from "@/app/_components/theme-toggle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const VerifyPage = ({ params }: { params: { code: string } }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const session = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: params.code,email:session.data?.user?.email }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Code verified successfully!");
                router.push("/dashboard");
            } else {
                setMessage(result.message || "Verification failed.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-100 text-gray-900 flex justify-center dark:bg-[#18181B] dark:text-white mx-auto">
        <div className="max-w-screen-xl m-0 sm:m-10 md:m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1 dark:bg-[#18181B] dark:text-white">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="mt-1 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold flex gap-4 mt-16 md:mt-24 ml-2">
                        Verify Account <ThemeToggle />
                    </h1>
                    <div className="w-full flex-1 mr-4">
                            <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                <div className="mb-8 mt-4 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 dark:bg-[#18181B] dark:text-white">
                                        Enter the Verification Code
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 dark:text-white dark:bg-[#2d2d2d] dark:border-gray-600"
                                    placeholder="Enter verification code"
                                    value={params.code}
                                    readOnly
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold transition duration-300 hover:bg-indigo-700"
                                >
                                    {isSubmitting ? "Verifying..." : "Verify"}
                                </button>

                                {message && (
                                    <p className="mt-4 text-center text-sm text-red-500">{message}</p>
                                )}
                            </form>

                       
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

export default VerifyPage;
