"use client";
import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

function OutputSection({ output }: { output: string }) {
  const editorRef = useRef<any>();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(output);
    }
  }, [output]);

  return (
    <div className={`py-4 shadow-md border rounded-lg bg-white dark:bg-[#18181B] col-span-2 h-[70vh] mt-20 mt:mt-auto  md:[h-10vh] w-[85vw] md:w-full`}>
      <div className="flex justify-between items-center pb-3 px-3">
        <h2 className="font-bold m-1 text-2xl text-primary">Output</h2>
        <Button
          onClick={() => navigator.clipboard.writeText(output)}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Copy size={16} className="mr-1" />
          Copy
        </Button>
      </div>
      <div className="w-[80vw] md:w-full m-auto">
        <Editor
          ref={editorRef}
          key={theme} 
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          theme={theme === "dark" ? "dark" : "default"} // Apply dark theme based on system preference
        />
      </div>
    </div>
  );
}

export default OutputSection;
