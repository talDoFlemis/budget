import { NavLink } from "react-router-dom";

import Ouroboros from "../../img/ouroboros.svg";
import LinkButton from "./LinkButton";

// TODO: Tentar fazer a logo mudar de cor no onHOver provavelmente vc tem que suar a ReacTCompoennt
//TODO: Mudar a navbar pra retirar o criar projeto sem ser na homepage\
function Navbar() {
    return (
        <nav className="navbar justify-between pt-4 mx-10">
            <NavLink to="/" className="mr-4">
                <img src={Ouroboros} alt="home" className="max-h-14" />
            </NavLink>
            <ul className="flex items-center">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "mr-4 font-bold text-primary"
                                : "mr-4 font-bold hover_primary"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            isActive
                                ? "mr-4 font-bold text-primary"
                                : "mr-4 font-bold hover_primary"
                        }
                    >
                        Projetos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "mr-4 font-bold text-primary"
                                : "mr-4 font-bold hover_primary"
                        }
                    >
                        Contato
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/company"
                        className={({ isActive }) =>
                            isActive
                                ? "mr-4 font-bold text-primary"
                                : "mr-4 font-bold hover_primary"
                        }
                    >
                        Sobre
                    </NavLink>
                </li>
                <li>
                    <LinkButton
                        to="newproject"
                        text="Criar projeto"
                        className="btn-primary"
                    />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
