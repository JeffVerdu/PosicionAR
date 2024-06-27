import { useSearch } from "../hooks/useSearch";
import { articulos } from "../articulos";
import { useEffect, useState } from "react";
import { Articulo_Tipo } from "../types";
import { Articulo } from "../components/common/Articulo";
import { Destacados } from "../components/destacados/Destacados";

import "../styles/articulos/articuloListaPorBusqueda.css";

export const ArticuloPorBusqueda = () => {
  const { searchTerm } = useSearch();
  const [articulosFiltrados, setArticulosFiltrados] = useState<Articulo_Tipo[]>(
    []
  );

  useEffect(() => {
    const filtrados = articulos.filter((articulo) =>
      articulo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setArticulosFiltrados(filtrados);
  }, [searchTerm]);

  return (
    <>
      {articulosFiltrados.length > 0 ? (
        <div className="busqueda-content">
          <h2 className="busqueda-heading">Resultados para: {searchTerm}</h2>
          <div className="articulosPorBusqueda-list">
            {articulosFiltrados.map((articulo) => (
              <Articulo
                key={articulo.id}
                id={articulo.id}
                title={articulo.title}
                description={articulo.description}
                price={articulo.price}
                image={articulo.poster}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="busqueda-heading">
          No encontramos resultados para: {searchTerm}
        </h2>
      )}
      <Destacados />
    </>
  );
};
