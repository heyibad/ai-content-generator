import { Button } from "@/components/ui/button";
import { Template } from "@/helpers/template";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({ item }: { item: Template }) {
    return (
        <div
            className="flex mx-2 h-64 w-72 my-4 items-center justify-center flex-col p-5 bg-white rounded-md shadow-md
        gap-4 hover:scale-105 transition-all dark:bg-[#18181B] dark:text-white dark:shadow-lg
        "
        >
            <Image
                src={item.icon}
                alt={item.name}
                height={50}
                width={50}
                className=" rounded-md"
            />

            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="font-medium text-sm text-gray-500 line-clamp-3">
                {item.desc}
            </p>
            <Link href={`dashboard/tool/${item.slug}`}>
                <Button className="mt-2 px-4 py-2 text-white font-semibold bg-primary rounded-md w-full">
                    <Sparkles size={12} className=" mr-1" />
                    Generate
                </Button>
            </Link>
        </div>
    );
}

export default Card;
