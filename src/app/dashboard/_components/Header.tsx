import ThemeToggle from "@/app/_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut, Search, UserRoundPlus } from "lucide-react";
import React from "react";
import Logout from "./Logout";

function Header() {
    return (
        <div className="bg-white p-2 py-5 md:p-5  shadow-sm border-b-2 flex justify-between items-center gap-1 md:gap-4 dark:bg-[#18181B] dark:text-white">
            <div className="flex items-center rounded-3xl gap-2 md:gap-8 py-2 px-4 md:px-6 border max-w-72 md:max-w-xl">
                <Search className="w-4 " />
                <input
                    type="text"
                    placeholder="Search"
                    className="outline-none pl-4 md:pl-0 w-44 md:w-full"
                />
            </div>
            <div className="pl-2 flex items-center justify-center gap-2">
                <ThemeToggle className="w-9 h-9 " />
                <Button className="rounded-2xl h-9  text-sm hidden md:flex bg-primary dark:bg-black dark:hover:bg-primary ">
                 
                    <span>
                        🔥Join Membership for $9.99/Month
                    </span>
                </Button>
              <Logout/>
            </div>
        </div>
    );
}

export default Header;
