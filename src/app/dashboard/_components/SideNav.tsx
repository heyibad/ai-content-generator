import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SideNav() {
    const MenuList = [
        {
            name: "Home",
            icon: Home,
            path: "/dashboard",
        },
        {
            name: "History",
            icon: FileClock,
            path: "/dashboard/history",
        },
        {
            name: "Billing",
            icon: WalletCards,
            path: "/dashboard/billing",
        },
        {
            name: "Setting",
            icon: Settings,
            path: "/dashboard/setting",
        },
    ];
    return (
        <div className="h-screen p-5 shadow-sm border">
            <div className="flex justify-center">
                <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
            </div>
            <div className="mt-10">
                {MenuList.map((menu, index) => {
                    return (
                        <div key={index} className="flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white hover:rounded-lg cursor-pointer">
                            <menu.icon />
                            <h2>
                                <Link href={menu.path}>
                                  {menu.name}
                                  </Link>
                            </h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SideNav;
