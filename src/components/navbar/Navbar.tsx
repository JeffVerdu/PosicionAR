import { Search } from "lucide-react";
import "../../styles/navbar/navbar.css";
import { Boton } from "../common/Boton";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="nav-bar container-box">
      <Link to="/">
        <h1 className="logo">
          PosicionAR!<span>Si lo buscas, lo encuentras</span>
        </h1>
      </Link>
      <div className="navbar-item">
        <form className="search">
          <input placeholder="Ej: 'Excursiones'" type="text" required />
          <button type="submit">
            <Search color="#ffffff" />
          </button>
        </form>
        <Link to="/contacto">
          <Boton text="Publicá con nosotros" />
        </Link>
      </div>
    </header>
  );
};
