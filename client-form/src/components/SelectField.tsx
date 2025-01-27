import React from 'react';

const SelectField = ({ name, value, onChange, options, required }) => {
  return (
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="">Selecione uma cor</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
