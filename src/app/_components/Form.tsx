"use client"
import { LockOpen, User } from "lucide-react";
import React from "react";

const Signup = ({ type }: { type: string }) => {
    const [form, setForm] = React.useState<{[key:string]:string}>({})
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(form)
    }
    return (
        <form onSubmit={onSubmitHandle}>
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
            <button className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
            {
                type === "signup" ? <User size={18} /> : <LockOpen size={18} />
            }
             
                <span className="ml-3">
                    {type === "signup" ? "Sign Up" : "Login"}
                </span>
            </button>
        </form>
    );
};

export default Signup;
