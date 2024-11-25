import { NavLink } from 'react-router-dom'; // Importar NavLink
import './styles.css';

export default function NavBar() {
    return (
        <section className='navbar'>
            <img src="/logo.png" alt="logo" />
            <nav className="links">
                <NavLink className="link" to="/cadastro-usuarios" activeClassName="active-link">
                    Cadastro de Usuários
                </NavLink>
                <NavLink className="link" to="/cadastrar-tarefas" activeClassName="active-link">
                    Cadastro de Tarefas
                </NavLink>
                <NavLink className="link" to="/gerenciar-tarefas" activeClassName="active-link">
                    Gerenciar Tarefas
                </NavLink>
            </nav>
        </section>
    );
}
