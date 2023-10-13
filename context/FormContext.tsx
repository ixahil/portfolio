"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Children = {
  children: React.ReactNode;
};

type Form = {
  title: string;
  description: string;
  images: []; // Use string[] instead of [string]
  status: boolean;
  selectedTech: string[]; // Use string[] instead of [string]
  createdDate: string;
};

// Define the context with an initial value of null
const FormContext = createContext<null | {
  formData: Form;
  updateFormData: (newData: Form) => void;
}>(null);

type FormProviderProps = {
  children: React.ReactNode;
  initialValues: {
    title: string;
    description: string;
    images: []; // Use string[] instead of [string]
    status: boolean;
    selectedTech: string[]; // Use string[] instead of [string]
    createdDate: string;
  };
};

export function FormProvider({ children, initialValues }: FormProviderProps) {
  const [formData, setFormData] = useState<Form>(initialValues);

  const updateFormData = (newData: Form) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
