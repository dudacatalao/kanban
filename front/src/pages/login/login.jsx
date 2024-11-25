import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [msn, setMsn] = useState('');
  
  // Initialize useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/', {
        username,
        email,
      });
      console.log('Usuário cadastrado:', response.data);
      setMsn('Cadastro concluído com sucesso!!!');
      setUsername('');
      setEmail('');
      
      navigate('/gerenciar-tarefas'); 
    } catch (error) {
      console.log("Username: ", username);
      console.log("Email: ", email);
      console.error('Erro ao cadastrar usuário:', error);
      setMsn('Erro ao cadastrar usuário.');
    }
  };

  return (
    <section>
      <div className='left'>
        <p className='title'>Bem-vindo ao Kanban Virtual</p>
        <p className='subtitle'>Faça login com suas informações para continuar</p>
        <form className='formLogin' onSubmit={handleSubmit}>
          <div className='containerForm'>
            <label htmlFor="username">Nome</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='containerForm'>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="containerCheckbox">
            <input type="checkbox" name="remember" id="1" />
            <label htmlFor="remember">Relembrar</label>
          </div>

          <div className='containerButton'>
            <button type='submit' className="btn-donate">Cadastrar</button>
          </div>

          <div>
            <p>{msn}</p>
          </div>
        </form>
      </div>

      <div className="right">
       <img src="/scrum_board.svg" alt="ilustration scrum board" />

       <div className="logo">
        <img src="/logo.png" alt="logo" />
       </div>
      </div>
    </section>
  );
}
