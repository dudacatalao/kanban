import React, { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import NavBar from "../../components/navbar/navbar";
import Swal from "sweetalert2";

const TaskForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    axios.post("http://localhost:8000/api/tasks/", formData)
      .then(response => {
        Swal.fire({
          title: "Tarefa Cadastrada!",
          text: "A tarefa foi adicionada com sucesso.",
          icon: "success",
          confirmButtonColor: "#1C66B6",
          confirmButtonText: "Fechar",
        });

        setFormData({
          usuario: "",
          descricao: "",
          setor: "",
          prioridade: "baixa",
          status: "a_fazer",
        });
      })
      .catch(error => {
        console.error("Erro ao cadastrar tarefa:", error);
        Swal.fire({
          title: "Erro!",
          text: "Erro ao cadastrar. Verifique os dados e tente novamente.",
          icon: "error",
          confirmButtonColor: "#1C66B6",
          confirmButtonText: "Fechar",
        });
      });
  };

  return (
    <div>
      <section>
        <NavBar />
      </section>

      <main>
        <p className="title">Cadastrar Nova Tarefa</p>
        <form onSubmit={handleSubmit}>
          <div className="containerName">
            <label>Usuário</label>
            <select name="usuario" value={formData.usuario} onChange={handleChange} required>
              <option value="">Selecione um usuário</option>
              {usuarios.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Descrição da Tarefa:</label>
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>
          <div className="containerName">
            <label>Setor:</label>
            <input type="text" name="setor" placeholder="Insira o Setor" value={formData.setor} onChange={handleChange} required />
          </div>
          <div>
            <label>Prioridade:</label>
            <select name="prioridade" value={formData.prioridade} onChange={handleChange} required>
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
          <button type="submit" className="button">Cadastrar Tarefa</button>
        </form>
      </main>
    </div>
  );
};

export default TaskForm;
