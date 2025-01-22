import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo-eteg.png';
import startupBackground from './assets/startup-pessoas.jpeg'

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    preferredColor: '',
    observations: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
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

  const submitClientData = async (data) => {
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

  return (
    <div className="App">
      <div class="container">
        <section class="form">
          <img src={logo} alt="logo da empresa ETEG" className='logo' />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome Completo <span class="required">*</span></label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder='Digite seu nome completo'
                required
              />
            </div>

            <div className="form-group">
              <label>CPF <span class="required">*</span></label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                maxLength="11"
                placeholder='XXX.XXX.XXX-XX'
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail <span class="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Digite o seu melhor e-mail'
                required
              />
            </div>

            <div className="form-group">
              <label>Cor Preferida <span class="required">*</span></label>
              <select
                name="preferredColor"
                value={formData.preferredColor}
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
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button type="submit">Enviar</button>
          </form>
        </section>
        <section class="background">
          <img src={startupBackground} alt="Pessoas de uma startup" class="background-image" />
          <div class="overlay"></div>
        </section>
      </div>
    </div>
  );
}

export default App;
