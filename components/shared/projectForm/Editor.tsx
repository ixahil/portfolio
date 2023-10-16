"use client";
import { useFormContext } from "@/context/FormContext";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function RichEditor() {
  const { formData } = useFormContext();
  const [value, setValue] = useState(formData.description);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const onStateChange = (editorState: string) => {
    setValue(editorState);
    // updateFormData((prevData:Form) => ({
    //   ...prevData,
    //   description: editorState,
    // }));

    formData.description = editorState;
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onStateChange}
      modules={modules}
      className=""
      placeholder="Write Project Description"
    />
  );
}

export default RichEditor;
