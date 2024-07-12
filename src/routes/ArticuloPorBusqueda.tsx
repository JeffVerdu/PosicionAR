import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { Anuncio_Tipo } from "../types";
import { Articulo } from "../components/common/Articulo";
import { Destacados } from "../components/destacados/Destacados";
import { obtenerAnuncios } from "../services/firebaseServices";
import { Loading } from "../components/common/Loading";
import removeAccents from "remove-accents";

import "../styles/articulos/articuloListaPorBusqueda.css";

export const ArticuloPorBusqueda = () => {
  const { searchTerm } = useSearch();
  const [articulosFiltrados, setArticulosFiltrados] = useState<Anuncio_Tipo[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const anuncios = await obtenerAnuncios();
        const obtenerPorBusqueda = anuncios.filter((articulo) => {
          const tituloNormalizado = removeAccents(articulo.title).toLowerCase();
          const descripcionNormalizada = removeAccents(
            articulo.description
          ).toLowerCase();
          const detallesNormalizados = removeAccents(
            articulo.details
          ).toLowerCase();
          const anuncianteNormalizado = removeAccents(
            articulo.anunciante.name
          ).toLowerCase();

          return (
            tituloNormalizado.includes(searchTerm) ||
            descripcionNormalizada.includes(searchTerm) ||
            detallesNormalizados.includes(searchTerm) ||
            anuncianteNormalizado.includes(searchTerm)
          );
        });
        setArticulosFiltrados(obtenerPorBusqueda);
      } catch (error) {
        setError("Error al obtener los anuncios");
        console.error("Error al obtener los anuncios", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarArticulos();
  }, [searchTerm]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
