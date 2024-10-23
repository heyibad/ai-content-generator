
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = ({className}:{
    className:string
}) => {

    return (
        <Button size={"sm"} className={`gap-1 hover:bg-red-500 h-9 ${className}`}
        onClick={() => signOut()}
        >
            <LogOut size={16} />
            Logout
        </Button>
    );
};

export default Logout;
