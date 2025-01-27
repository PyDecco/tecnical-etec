import React from 'react';

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
  required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  required,
}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default InputField;

