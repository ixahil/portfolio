'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for your form fields
type ImageObject = {
  public_id: string;
  imageURL: string;
};

type ThumbnailObject = {
  imageURL: string;
  public_id: string;
};

export type Form = {
  title: string;
  source: string;
  demo: string;
  description: string;
  images: ImageObject[];
  selectedTech: string[];
  status: boolean;
  createdDate: string;
  thumbnail: ThumbnailObject;
};

// Define the context with an initial value of null
type FormContextType = {
  formData: Form;
  updateFormData: (newData: Partial<Form>) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

type FormProviderProps = {
  children: ReactNode;
  initialValues: Form;
};

export function FormProvider({ children, initialValues }: FormProviderProps) {
  const [formData, setFormData] = useState<Form>(initialValues);

  const updateFormData = (newData: Partial<Form>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }) as Form);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>{children}</FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
