"use client";
import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Template, template } from "@/template";
import { chatSession } from "@/Ai";

interface PropsTypes {
    params: {
        slug: string;
    };
}

const Page = ({ params: { slug } }: PropsTypes) => {
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
        setLoading(true);
        const selectedPrompt = toolType.aiPrompt;
        const FinalPrompt = JSON.stringify(formdata) + " " + selectedPrompt;
        console.log(FinalPrompt);

        try {
            const result = await chatSession.sendMessage(FinalPrompt);
            const responseText = await result.response.text();
            console.log(responseText);
            setOutput(responseText);
        } catch (error) {
            console.error("Error generating AI content:", error);
        } finally {
            setLoading(false);
        }
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
            <OutputSection output={output}/>
        </div>
    );
};

export default Page;
