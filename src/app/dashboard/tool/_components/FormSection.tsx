"use client"
import { Button } from "@/components/ui/button";
import { Template } from "@/template";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";

function FormSection({ data }: { data?: Template }) {
  const onSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    
  }
    return (
        <div className="p-6 shadow-md border rounded-lg bg-white">
            <Image src={data!.icon} alt="logo" width={50} height={50} />
            <h2 className="font-bold my-2 text-2xl text-primary">
                {data?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{data?.desc}</p>
            <form action="" className="mt-3 " onSubmit={onSubmit}>

              {
                data?.form.map((field,index)=>(
                  <div className="mb-2" key={index}>
                    <label htmlFor={field.name} className="text-sm text-gray-500 mb-2 block">{field.label}</label>
                    {
                      field.type === "text" ? (
                        <input type="text" name={field.name} id={field.name} placeholder={field.placeholder} required={field.required} className="border outline-none p-2 rounded-lg w-full mb-3"/>
                      ) : (
                        <textarea name={field.name} id={field.name} placeholder={field.placeholder} required={field.required} className="outline-none border p-4 h-36 rounded-lg w-full mb-3"/>
                      )
                    }

                  </div>
                ))
              }
              <Button type="submit" className="w-full font-semibold ">
                <Sparkles  size={12}  className="mr-1 "/>
                 Generate</Button>
            </form>
        </div>
    );
}

export default FormSection;
