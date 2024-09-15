import Image from "next/image";
import { BackgroundBeamsWithCollision } from "./_components/bg";
import { Button } from "@/components/ui/button";
import { ChevronRight, LockOpen, User } from "lucide-react";
import ThemeToggle from "./_components/theme-toggle";

export default function Home() {
  return (
    <div className="wrapper ">
      <header className="flex justify-between h-20 p-4 border-b gap-4 wrapper ">
      <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="animate-spin-slow"
          />
          <div className="gap-4 flex ">
            <ThemeToggle/>

          <Button className="gap-1 p-3 dark:text-white"> <User size={18}/>Get Started</Button>
          <Button className="gap-2 p-3 px-5 dark:text-white"> <LockOpen size={18}/>Login</Button>
          </div>

      </header>
      <BackgroundBeamsWithCollision className="h-screen flex flex-col items-center justify-center wrapper">
 

        <div className="flex flex-col items-center justify-center -translate-y-[60%]  md:-translate-y-[20%] gap-2  p-6">
 
          <h1 className=" text-3xl md:text-6xl font-bold ">AI Content <span className="text-primary">Generator</span></h1>
          <p className="text-lg md:text-2xl w-[90vw] text-center mt-2 text-gray-600  pb-2 text-wrap  dark:text-gray-200">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
          </p>
          <Button className="gap-1 text-lg p-6 mt-2 rounded-sm bg-gradient-to-tl from-purple-500 via-purple-700 to-blue-600 dark:text-white"> <ChevronRight size={22}/>Get Started</Button>

        </div>
        <footer className="md:mt-16">
          <p className=" text-gray-600 mt-4 dark:text-white">Build with ❤️ By Ibad </p>
        </footer>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
