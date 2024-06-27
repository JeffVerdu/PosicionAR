import "../../styles/navbar/navbar.css";
import { Boton } from "../common/Boton";
import { Link } from "react-router-dom";
import { SearchBar } from "../common/SearchBar";

export const Navbar = () => {
  return (
    <header className="nav-bar container-box">
      <Link to="/">
        <h1 className="logo">
          PosicionAR!<span>Si lo buscas, lo encuentras</span>
        </h1>
      </Link>
      <div className="navbar-item">
        <SearchBar />
        <Link to="/contacto">
          <Boton text="Publicá con nosotros" />
        </Link>
      </div>
    </header>
  );
};
