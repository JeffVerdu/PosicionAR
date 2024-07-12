import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/admin/paginaAdmin.css";

export const PaginaAdmin = () => {
  const { currentUser, loading, signout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  const handleLogout = async () => {
    await signout();
  };

  const handleRedirect = (route) => {
    navigate(route);
  };

  return (
    <>
      <Link to="/" target="_blank" className="logo-admin">
        PosicionAR!
      </Link>
      <main className="admin-container">
        <div className="buttons-container">
          <div className="opciones-container">
            <button
              className="button-admin"
              onClick={() => {
                handleRedirect("/admin/nuevo-anuncio");
              }}
            >
              Crear Anuncio
            </button>
            <button
              className="button-admin"
              onClick={() => {
                handleRedirect("/admin/editar-anuncio");
              }}
            >
              Editar/Eliminar Anuncio
            </button>
          </div>
          <button className="button-signout" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </main>
    </>
  );
};
