"use client";
import { Loader2, LockOpen, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Form = ({ type }: { type: "login" | "signup" }) => {
    const router = useRouter();
    const [form, setForm] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!form.email || !form.email.includes("@")) {
            setError("Invalid email format.");
            return false;
        }
        if (
            type === "signup" &&
            form.username &&
            /[^a-zA-Z0-9]/.test(form.username)
        ) {
            setError("Username should not contain special characters.");
            return false;
        }
        if (!form.password || form.password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return false;
        }
        setError(null);
        return true;
    };

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        if (type === "login") {
            // Login logic
            try {
                const res = await signIn("credentials", {
                    redirect: false,
                    email: form.email,
                    password: form.password,
                });

                if (res?.error) {
                    setError(res.error || "Login failed. Please try again.");
                } else {
                    router.push("/dashboard"); // Redirect on successful login
                }
            } catch (error) {
                setError("An error occurred during login.");
            } finally {
                setLoading(false);
            }
        } else {
            // Signup logic
            console.log(form);
            try {
                const res = await fetch(`/api/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                });

                if (!res.ok) {
                    const errMessage = await res.text();
                    throw new Error(errMessage || "Signup failed.");
                }

                const data = await res.json();
                console.log("Signup successful:", data);
                router.push("/dashboard"); // Redirect on successful signup
            } catch (error: any) {
                setError(error?.message || "Signup failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form
            className="text-[#18181B]"
            onSubmit={onSubmitHandle}
            method="POST"
        >
            <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
            />
            {type === "signup" && (
                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
            )}
            <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                disabled={loading}
            >
                {loading ? (
                    <Loader2 className="animate-spin"/>
                ) : (
                    <>
                    
                            {type === "signup" ? (
                                <User size={18} />
                            ) : (
                                <LockOpen size={18} />
                            )}
                       
                        <span className="ml-3">
                            {type === "signup" ? "Sign Up" : "Login"}
                        </span>
                    </>
                )}
            </button>
        </form>
    );
};

export default Form;
