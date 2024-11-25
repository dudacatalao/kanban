import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css'
import NavBar from '../../components/navbar/navbar';


function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [msn, setMsn] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/', {
        username,
        email,
      });
      console.log('Usuário cadastrado:', response.data);
      setMsn('Cadastro concluído com sucesso!!!')
      setUsername('');
      setEmail('');
    } catch (error) {
      console.log("Username: ", username)
      console.log("Email: ", email)
      console.error('Erro ao cadastrar usuário:', error);
      setMsn('Erro ao cadastrar usuário.')
    }
  };

  return (
    <div className='containner'>
      <header className="">
        <NavBar/>
      </header>

      <main>
        <p className='title'>Gerenciamento de Usuários</p>
        <p className="subtitle"> Adicione e organize os usuários do sistema facilmente.</p>
        <form onSubmit={handleSubmit}>
          <div className='containerName'>
            <label htmlFor="username">Nome</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Digite o nome do Usuário'
            />
          </div>
          <div className='containerEmail'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Digite o Email do Usuário'
              required
            />
          </div>
          <div className='buttonArea'>
            <button type="submit" className="button">Cadastrar</button>
          </div>
          <div>
            <p style={{ color: 'green' }}>{msn}</p>
          </div>
        </form>
      </main>
    </div>
  );
}


export default Home;
