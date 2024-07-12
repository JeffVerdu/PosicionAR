import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Categoria } from "../../types";
import { obtenerCategorias } from "../../services/firebaseServices";
import { capitalize } from "../../utils/capitalize";
import { Loading } from "../common/Loading";

import "../../styles/categorias/categorias.css";

export const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasObtenidas: Categoria[] = await obtenerCategorias();
        setCategorias(categoriasObtenidas);
      } catch (error) {
        setError("Error al obtener las categorías");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarCategorias();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="categorias">
      <div className="categorias-content">
        <div className="categorias-list container-box">
          {categorias.map((category) => (
            <NavLink
              to={`/categoria/${category.key}`}
              key={category.id}
              className={({ isActive }) => (isActive ? "activeCategory" : "")}
            >
              <p>{capitalize(category.name)}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
