import { Search } from "lucide-react";
import "../../styles/navbar/navbar.css";
import { Boton } from "../common/Boton";

export const Navbar = () => {
  return (
    <header className="nav-bar container-box">
      <h1 className="logo">
        PosicionAR!<span>El que busca, encuentra</span>
      </h1>
      <div className="navbar-item">
        <form className="search">
          <input placeholder="Ej: 'Excursiones'" type="text" required />
          <button type="submit">
            <Search color="#ffffff" />
          </button>
        </form>
        <Boton text="Publicá con nosotros" />
      </div>
    </header>
  );
};
