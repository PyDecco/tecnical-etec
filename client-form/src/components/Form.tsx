import React from 'react';
import FormGroup from './FormGroup.tsx';
import InputField from './InputField.tsx';
import SelectField from './SelectField.tsx';
import TextAreaField from './TextAreaField.tsx';
import '../App.css'; 

const Form = ({ onSubmit, formData, setFormData, colors, errorMessage, successMessage }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <label>Nome Completo <span className="required">*</span></label>
        <InputField
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Digite seu nome completo"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>CPF <span className="required">*</span></label>
        <InputField
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          maxLength={11}
          placeholder="XXX.XXX.XXX-XX"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>E-mail <span className="required">*</span></label>
        <InputField
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Digite o seu melhor e-mail"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Cor Preferida <span className="required">*</span></label>
        <SelectField
          name="preferredColor"
          value={formData.preferredColor}
          onChange={handleInputChange}
          options={colors}
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Observações</label>
        <TextAreaField
          name="observations"
          value={formData.observations}
          onChange={handleInputChange}
        />
      </FormGroup>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
