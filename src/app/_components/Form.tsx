import { LockOpen, LogInIcon, User } from "lucide-react";
import React from "react";

const Signup = ({ type }: { type: string }) => {
    return (
        <form>
            <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
            />
            {type === "signup" && (
                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                    type="text"
                    placeholder="Username"
                />
            )}
            <input
                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                type="password"
                placeholder="Password"
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
