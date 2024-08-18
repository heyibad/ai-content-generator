import React from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Template, template } from "@/template";

interface PropsTypes {
    params: {
        slug: string;
    };
}

const page = ({ params: { slug } }: PropsTypes) => {
    const toolType: Template | undefined = template.find(
        (tool: Template) => tool.slug === slug
    );
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
            <FormSection data={toolType} />
            <OutputSection />
        </div>
    );
};

export default page;
