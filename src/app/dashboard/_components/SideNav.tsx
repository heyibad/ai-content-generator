"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Usage from "./Usage";

export const MenuList = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "History", icon: FileClock, path: "/dashboard/history" },
  { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
  { name: "Setting", icon: Settings, path: "/dashboard/setting" },
];

function SideNav() {
  const path = usePathname();

  useEffect(() => {
    console.log("Current path:", path);
  }, [path]);

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white dark:bg-[#18181B] dark:text-white">
      <div className="flex justify-center">
        <Link href="/dashboard">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>
      </div>

      <div className="mt-16">
        {MenuList.map((each, index) => (
          <Link href={each.path} key={index} className="block">
            <div
              className={`flex gap-3 mb-2 p-2 pl-12 text-xl items-center hover:bg-primary hover:text-white hover:rounded-lg cursor-pointer
              ${path === each.path ? "bg-primary text-white rounded-lg" : ""}
              `}
            >
              <each.icon className="h-5 w-5" />
              <h2>{each.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-10 left-0 w-full">
        <Usage />
      </div>
    </div>
  );
}

export default SideNav;
