import React, { useState } from 'react';
import './App.css';
import logo from './assets/images/logo-eteg.png';
import startupBackground from './assets/images/startup-pessoas.jpeg';
import Form from './components/Form.tsx';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    preferredColor: '',
    observations: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const response = await submitClientData(formData);

      if (response.status === 201) {
        setSuccessMessage('Cadastro realizado com sucesso!');
        setFormData({ fullName: '', cpf: '', email: '', preferredColor: '', observations: '' });
      } else {
        setErrorMessage('Erro inesperado ao enviar o cadastro. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Ocorreu um erro ao enviar o cadastro. Tente novamente.');
    }
  };

  const submitClientData = async (data: any) => {
    const response = await fetch('http://localhost:3000/clients/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao processar a solicitação.');
    }

    return response;
  };

  const validateForm = (): string => {
    const { fullName, cpf, email, preferredColor } = formData;
    if (!fullName || !cpf || !email || !preferredColor) {
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

  return (
    <div className="App">
      <div className="container">
        <section className="form">
          <img src={logo} alt="logo da empresa ETEG" className="logo" />
          <Form
            formData={formData}
            setFormData={setFormData}
            colors={colors}
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </section>
        <section className="background">
          <img src={startupBackground} alt="Pessoas de uma startup" className="background-image" />
          <div className="overlay"></div>
        </section>
      </div>
    </div>
  );
}

export default App;
