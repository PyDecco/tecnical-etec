import React, { ReactNode } from 'react';

interface FormGroupProps {
  children: ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ children }) => {
  return <div className="form-group">{children}</div>;
};

export default FormGroup;