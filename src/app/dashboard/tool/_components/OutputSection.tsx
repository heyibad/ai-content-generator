"use client";
import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy } from "lucide-react";
import { useRef } from "react";

function OutputSection() {
    const editorRef = useRef<any>();
    const handleEditorChange = () => {
        console.log(editorRef.current?.getInstance().getMarkdown
        ());
    }
    return (
        <div className="py-4 shadow-md border rounded-lg bg-white col-span-2 h-[100vh] w-[85vw] md:w-full ">
            <div className="flex justify-between items-center pb-3 px-3">
                <h2 className="font-bold m-1 text-2xl text-primary">Output</h2>
                <Button className=" bg-primary text-white px-4 py-2 rounded-lg">
                    <Copy size={16} className="mr-1" />
                    Copy
                </Button>
            </div>
            <div className="w-[80vw] md:w-full m-auto">
                <Editor
                ref={editorRef}
                onChange={handleEditorChange}
                    initialValue="hello react editor world!"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wsywig"
                    useCommandShortcut={true}
                />
            </div>
        </div>
    );
}

export default OutputSection;
