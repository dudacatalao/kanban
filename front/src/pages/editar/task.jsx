import React, { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from "../../components/navbar/navbar";
import Swal from "sweetalert2";

const TaskForm = () => {
  const { id } = useParams(); 
  const [task, setTask] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 
  const [usuarios, setUsuarios] = useState([]); 
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
        console.log('Dados da Tarefa:', response.data); 
        const taskData = response.data;
        setTask(taskData);

        setFormData({
          usuario: taskData.usuario || "",
          descricao: taskData.descricao || "",
          setor: taskData.setor || "",
          prioridade: taskData.prioridade || "baixa",
          status: taskData.status || "a_fazer",
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar a tarefa:', error);
        setLoading(false); 
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    axios.put(`http://localhost:8000/api/tasks/${id}/`, formData)
      .then(response => {
      Swal.fire({
          title: "Tarefa Atualizada!",
          text: "A Tarefa foi atualizada com sucesso.",
          icon: "success",
          confirmButtonColor: "#1C66B6",
          confirmButtonText: "Fechar",
      });
        navigate("/gerenciar-tarefas"); 
      })
      .catch(error => {
        console.error("Erro ao atualizar a tarefa:", error);
        Swal.fire({
          title: "Erro!",
          text: "Erro ao atualizar a tarefa. Tente novamente.",
          icon: "error",
          confirmButtonColor: "#1C66B6",
          confirmButtonText: "Fechar",
      })
      });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <header className="">
        <NavBar/>
      </header>

      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="usuario" value={formData.usuario} onChange={handleChange} required>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Setor:</label>
          <input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prioridade:</label>
          <select
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            required
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="a_fazer">A Fazer</option>
            <option value="fazendo">Fazendo</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default TaskForm;
