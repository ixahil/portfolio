"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";

import "react-quill/dist/quill.snow.css";

type Props = {
  initialValue: string;
};

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
});

function RichEditor({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const { formData, updateFormData } = useFormContext();

  const onStateChange = (editorState: any) => {
    setValue(editorState);
    updateFormData({
      ...formData,
      description: editorState,
    });
  };

  return <ReactQuill theme="snow" value={value} onChange={onStateChange} />;
}

export default RichEditor;
