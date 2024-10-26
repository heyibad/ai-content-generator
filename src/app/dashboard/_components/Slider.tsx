import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { MenuList } from "./SideNav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logout from "./Logout";
import Usage from "./Usage";

interface SliderProps {}

const Slider: React.FC<SliderProps> = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="md:hidden flex">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <AlignJustify size={28} className="mx-2" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
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

                <div className="mt-40">
                  <Usage m="m-0" />
                  <Logout className="md:hidden flex w-full mx-auto" />
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