"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Template, template } from "@/helpers/template";
import { chatSession } from "@/helpers/Ai";
import { db } from "../../../../../utils/db";
import { Content } from "../../../../../utils/schema";
import { TotalUsage } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface PropsTypes {
    params: {
        slug: string;
    };
}

const Page = ({ params: { slug } }: PropsTypes) => {
    const { data: session, status } = useSession();

    const user = session?.user?.email;

    const { totalUsage, setTotalUsage } = useContext(TotalUsage);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState<string>("");
    const toolType: Template | undefined = template.find(
        (tool: Template) => tool.slug === slug
    );

    if (!toolType) {
        console.error(`Tool type for slug ${slug} not found.`);
        return <div>Error: Tool not found</div>;
    }

    const GenerateAiContent = async (formdata: { [key: string]: string }) => {
        if (totalUsage >= 10000) {
            alert("Your Limit is up! Kindly Upgrade to premium plan");
            router.push("/dasboard/billing");
            return;
        }
        setLoading(true);
        const selectedPrompt = toolType.aiPrompt;
        const FinalPrompt = JSON.stringify(formdata) + " " + selectedPrompt;
        console.log(FinalPrompt);

        try {
            const result = await chatSession.sendMessage(FinalPrompt);
            const responseText = await result.response.text();
            console.log(responseText);
            setOutput(responseText);
            saveToDB(formdata, toolType.slug, responseText);
        } catch (error) {
            console.error("Error generating AI content:", error);
        } finally {
            setLoading(false);
        }
    };
    const dateGenerator = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
        const year = currentDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        // console.log(formattedDate);
        return formattedDate;
    };
    const saveToDB = async (formData: any, slugVal: string, aiOut: string) => {
        const result = await db.insert(Content).values({
            formData: formData, // Assign a default value to formData
            aiResponse: aiOut,
            toolName: slugVal,
            createdBy: user!,
        });
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-5 items-center">
            <FormSection
                data={toolType}
                userFormInput={(v: { [key: string]: string }) => {
                    GenerateAiContent(v);
                }}
                loading={loading}
            />
            <OutputSection output={output} />
        </div>
    );
};

export default Page;
