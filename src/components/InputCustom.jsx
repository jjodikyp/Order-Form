import React from 'react';

const InputCustom = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default InputCustom;