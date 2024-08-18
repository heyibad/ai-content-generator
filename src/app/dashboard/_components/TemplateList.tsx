import { Template, template } from "@/template";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function TemplateList({search}: Readonly<{search: string}>) {
    const [tempData, setTempData] = useState<Template[]>(template)
    useEffect(() => {
        if(search && search!=""){
            const data = tempData.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
            setTempData(data)
        }
        else{
            setTempData(template)
        }
    }, [search]);
    return (
        <div className="flex flex-wrap items-center justify-center ">
            {tempData.map((item: Template, index: number) => (
                <div key={index}>
                    <Card item={item} />
                </div>
            ))}
        </div>
    );
}

export default TemplateList;
