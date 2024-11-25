import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import NavBar from '../../components/navbar/navbar';
import Swal from "sweetalert2";

const GerenciamentoDeTarefas = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [tasks, setTasks] = useState([]);
    
    const statusColors = {
        a_fazer: '#F9F0F0', 
        fazendo: '#FEF4E2', 
        pronto: '#F7FCEC', 
    };

    const [statusOptions] = useState([
        { value: 'a_fazer', label: 'A Fazer' },
        { value: 'fazendo', label: 'Fazendo' },
        { value: 'pronto', label: 'Pronto' }
    ]);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            console.log('users:', response.data);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            const tasksWithUsernames = response.data.map(task => {
                const user = usuarios.find(u => u.id === task.user);
                return { ...task, username: user ? user.username : "Desconhecido" }; 
            });
            setTasks(tasksWithUsernames);
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (usuarios.length > 0) {
            fetchTasks();
        }
    }, [usuarios]); // Fetch tasks only after users are loaded

    const handleStatusChange = async (taskId, newStatus) => {
        console.log("ID da Tarefa:", taskId);
        console.log("Novo Status:", newStatus);

        const taskToUpdate = tasks.find(task => task.id === taskId);

        if (!taskToUpdate) {
            console.error("Tarefa não encontrada!");
            return;
        }

        try {
            const updatedTask = { ...taskToUpdate, status: newStatus };
            await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? updatedTask : task
                )
            );
            Swal.fire({
                title: "Status atualizado!",
                text: "Status da tarefa atualizado com sucesso.",
                icon: "success",
                confirmButtonColor: "#1C66B6",
                confirmButtonText: "Fechar",
            });
        } catch (error) {
            console.error("Erro ao atualizar o status da tarefa:", error);
            Swal.fire({
                title: "Erro!",
                text: "Erro ao atualizar o status. Verifique os dados e tente novamente.",
                icon: "error",
                confirmButtonColor: "#1C66B6",
                confirmButtonText: "Fechar",
            });
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/del/${taskId}/`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            Swal.fire({
                title: "Tarefa excluída!",
                text: "Tarefa excluída com sucesso!",
                icon: "success",
                confirmButtonColor: "#1C66B6",
                confirmButtonText: "Fechar",
            });
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
            Swal.fire({
                title: "Erro!",
                text: "Erro ao excluir a tarefa. Tente novamente.",
                icon: "error",
                confirmButtonColor: "#1C66B6",
                confirmButtonText: "Fechar",
            });
        }
    };

    return (
        <div>
            <section>
                <NavBar/>
            </section>

            <div className="gridContainer">
                {tasks.map((task) => (
                    <div key={task.id} className="cardContainer">
                        <div className="card" style={{backgroundColor: statusColors[task.status] || '#f0f0f0'}}>
                            <div className="cabecalhoContainer">
                                <p className="cabecalho">{task.setor} | {task.username}</p> {/* Display username */}
                            </div>
                            <div className="containerTitle">
                                <p>{task.descricao}</p>
                            </div>
                            <p className="cadastro">Cadastro: {new Date(task.data_cadastro).toLocaleDateString()}</p>
                            <p className="cadastro">Prioridade: {task.prioridade}</p>

                            <div className="buttons">
                                <button onClick={() => navigate(`/editar-tarefa/${task.id}`)}>
                                    <img className="icon" src="/edit.svg" alt="editar" />
                                </button>

                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <img className="icon" src="/trash.svg" alt="delete" />
                                </button>
                            </div>
                        </div>

                        <div className="end">
                            <select
                                value={task.status} 
                                onChange={(e) => {
                                    const newStatus = e.target.value;
                                    setTasks(prevTasks =>
                                        prevTasks.map(t =>
                                            t.id === task.id ? { ...t, status: newStatus } : t
                                        )
                                    );
                                }}
                                className="status"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleStatusChange(task.id, task.status)}
                                className="statusBtn"
                                style={{
                                    backgroundColor: statusColors[task.status] || '#f0f0f0',
                                }}
                            >
                                Alterar status
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GerenciamentoDeTarefas;
