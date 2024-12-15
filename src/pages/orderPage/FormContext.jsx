import React, { createContext, useState } from 'react';

// Membuat Context
export const FormContext = createContext();

// Membuat Provider
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
