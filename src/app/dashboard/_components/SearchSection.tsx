import { Search } from "lucide-react";
import React from "react";

function SearchSection({setSearch}: Readonly<{setSearch: (value: string) => void}>) {
    return (
        <div
            className="p-10
        bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600
        flex items-center justify-center flex-col
        "
        >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
                Browse All Tools List
            </h2>
            <p className="p-1 text-white text-sm">What would you like to create today?</p>
            <div className="flex p-2 mt-4 bg-white rounded-md items-center border dark:bg-[#18181B] dark:text-white">
                <Search className="text-primary"/>
                <input
                    type="text"
                    placeholder="Search Templates"
                    className=" md:w-96 w-64 ml-4 outline-none bg-transparent"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default SearchSection;
