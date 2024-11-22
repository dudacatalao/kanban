import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GerenciamentoDeTarefas from './pages/gerenciamento/GerenciamentoDeTarefas.jsx';
import CadastroDeTarefas from './pages/cadastro/task.jsx';
import CadastroDeUsuario from './pages/home/index.jsx'
import EditarTarefa from './pages/editar/task.jsx'
import Login from './login/login.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/gerenciar-tarefas" element={<GerenciamentoDeTarefas />} />
                <Route path="/cadastrar-tarefas" element={<CadastroDeTarefas />} />
                <Route path="/cadastro-usuarios" element={<CadastroDeUsuario />} />
                <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
