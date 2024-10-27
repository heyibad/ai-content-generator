"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { Content } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { TotalUsage } from "@/app/(context)/TotalUsageContext";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function Usage({m}:{m?:string}) {
    const { data: session, status } = useSession();

    const user = session?.user?.email;
    const { totalUsage, setTotalUsage } = useContext(TotalUsage);
    async function getData() {
        const results = await db
            .select()
            .from(Content)
            .where(eq(Content.createdBy, user!));
        usage(results);
    }
    const usage = (result: any) => {
        let total: number = 0;
        result.forEach((element: any) => {
            total += Number(element.aiResponse?.length);
        });
        setTotalUsage(total);
    };
    useEffect(() => {
        user && getData();
    }, [user]);
    return (
        <div className={` ${m ? m: "m-5" }`}>
            <div className="bg-primary p-3 text-white rounded-lg">
                <h2 className="font-medium">Credits</h2>
                <div className="h-2 bg-[#9981f9] mt-3 rounded-lg ">
                    <div
                        className="h-2 bg-white rounded-full"
                        style={{
                            width: `${(totalUsage / 10000) * 100}%`,
                        }}
                    ></div>
                </div>
                <div className="text-sm my-2">
                    {totalUsage}/10,000 Credits Usage
                </div>
            </div>
            <Link href="/dashboard/billing">
                <Button
                    variant="secondary"
                    className="text-primary font-semibold w-full my-3"
                >
                    Upgrade
                </Button>
            </Link>
        </div>
    );
}

export default Usage;
