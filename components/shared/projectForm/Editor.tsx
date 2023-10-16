"use client";
import { useFormContext } from "@/context/FormContext";
import dynamic from "next/dynamic";
import { useState } from "react";

import "react-quill/dist/quill.snow.css";

type Props = {
  initialValue: string;
};

type FormValues = {
  title: string;
  description: string;
  images: [];
  status: boolean;
  selectedTech: string[];
  createdDate: string;
};

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function RichEditor() {
  const { formData } = useFormContext();
  const [value, setValue] = useState(formData.description);

  const onStateChange = (editorState: string) => {
    setValue(editorState);
    // updateFormData((prevData:Form) => ({
    //   ...prevData,
    //   description: editorState,
    // }));

    formData.description = editorState;
  };

  return <ReactQuill theme="snow" value={value} onChange={onStateChange} />;
}

export default RichEditor;
