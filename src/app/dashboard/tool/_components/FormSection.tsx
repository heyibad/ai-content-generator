"use client";
import { Button } from "@/components/ui/button";
import { Template } from "@/template";
import { Loader2Icon, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function FormSection({
    data,
    loading,
    userFormInput,
}: {
    data?: Template;
    loading: boolean;
    userFormInput: (v: { [key: string]: string }) => void;
}) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const onHandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userFormInput(formData);
    };
    return (
        <div className="p-6 shadow-md border rounded-lg bg-white col-span-1 h-[100vh] ">
            <Image src={data!.icon} alt="logo" width={50} height={50} />
            <h2 className="font-bold my-2 text-2xl text-primary">
                {data?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{data?.desc}</p>
            <form action="" className="mt-3 " onSubmit={onSubmit}>
                {data?.form.map((field, index) => (
                    <div className="mb-2" key={index}>
                        <label
                            htmlFor={field.name}
                            className="text-sm text-gray-500 mb-2 block"
                        >
                            {field.label}{" "}
                        </label>
                        {field.type === "text" ? (
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="border outline-none p-2 rounded-lg w-full mb-3"
                                onChange={onHandleChange}
                            />
                        ) : (
                            <textarea
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="outline-none border p-4 h-36 rounded-lg w-full mb-3"
                                onChange={onHandleChange}
                            />
                        )}
                    </div>
                ))}
                <Button
                    type="submit"
                    className="w-full font-semibold "
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2Icon size={12} className="mr-1 animate-spin " />
                    ) : (
                        <Sparkles size={12} className="mr-1 " />
                    )}
                    Generate
                </Button>
            </form>
        </div>
    );
}

export default FormSection;
