import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { MenuList } from "./SideNav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logout from "./Logout";
import Usage from "./Usage";

interface SliderProps {
    // Define your props here
}

const Slider: React.FC<SliderProps> = (props) => {
    const path = usePathname();
    return (
        <div className="md:hidden flex">
            <Sheet>
                <SheetTrigger>
                    <AlignJustify size={28} className="mx-2" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription className="">
                            <div className="mt-16">
                                {MenuList.map((each, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex gap-3 mb-2 p-2 pl-12 text-xl items-center hover:bg-primary hover:text-white hover:rounded-lg cursor-pointer
                    ${
                        path == each.path && "bg-primary text-white rounded-lg"
                    }        
                            `}
                                        >
                                            <each.icon className="h-5 w-5" />
                                            <h2>
                                                <Link href={`${each.path}`}>
                                                    {each.name}
                                                </Link>
                                            </h2>
                                        </div>
                                    );
                                })}
                                <div className="mt-40">
                                    <Usage />{" "}
                                    <Logout className=" md:hidden flex w-[55vw] mx-auto my-3 " />
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Slider;
