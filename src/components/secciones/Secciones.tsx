import { useEffect, useState } from "react";
import { ArticuloLista } from "../articulos/ArticuloLista";
import { Categoria } from "../../types";
import { obtenerCategorias } from "../../services/firebaseServices";
import { capitalize } from "../../utils/capitalize";
import { Loading } from "../common/Loading";

import "../../styles/secciones/secciones.css";

export const Secciones = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasObtenidas = await obtenerCategorias();
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
    <section className="secciones-container container-box">
      {categorias.map((categoria) => (
        <section key={categoria.id} className="categoria-seccion">
          <h2 className="categoria-title">{capitalize(categoria.name)}</h2>

          <div className="articulos-seccion">
            {<ArticuloLista categoriaId={categoria.id} />}
          </div>
        </section>
      ))}
    </section>
  );
};
