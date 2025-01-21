import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    favoriteColor: '',
    notes: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Indigo',
    'Violet',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, cpf, email, favoriteColor } = formData;
    if (!fullName || !cpf || !email || !favoriteColor) {
      return 'Por favor, preencha todos os campos obrigatórios!';
    }

    // Validação de CPF simples
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return 'O CPF deve conter 11 dígitos numéricos.';
    }

    // Validação de e-mail
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      return 'Por favor, insira um e-mail válido.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      // Simula o envio para o backend
      await mockApiCall(formData);
      setSuccessMessage('Cadastro realizado com sucesso!');
      setFormData({ fullName: '', cpf: '', email: '', favoriteColor: '', notes: '' });
    } catch (error) {
      setErrorMessage('Ocorreu um erro ao enviar o cadastro. Tente novamente.');
    }
  };

  const mockApiCall = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Dados enviados:', data);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="App">
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF *</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            maxLength="11"
            required
          />
        </div>

        <div className="form-group">
          <label>E-mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cor Preferida *</label>
          <select
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma cor</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Observações</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
