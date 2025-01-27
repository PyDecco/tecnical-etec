import React from 'react';

const TextAreaField = ({ name, value, onChange }) => {
  return <textarea name={name} value={value} onChange={onChange}></textarea>;
};

export default TextAreaField;
