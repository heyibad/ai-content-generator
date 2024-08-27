import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsage } from "../(context)/TotalUsageContext";

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [totalUsage,setTotalUsage]=useState<number>(0)
    return (
        <TotalUsage.Provider value={{totalUsage,setTotalUsage}}>

        <div className="overflow-hidden bg-slate-100">
            <div className="md:w-64 hidden md:block fixed">
                <SideNav />
            </div>

            <div className="md:ml-64 ">
                <Header />
                {children}
            </div>
        </div>
        </TotalUsage.Provider>
    );
}

export default Layout;
