import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  obtenerAnunciosPaginados,
  eliminarAnuncio,
  buscarAnuncios,
} from "../services/firebaseServices";
import { Anuncio_Tipo } from "../types";
import { toast, Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";

import "../styles/admin/listarAnuncios.css";

const ITEMS_PER_PAGE = 15;

export const ListarAnuncios: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio_Tipo[]>([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState<Anuncio_Tipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cargarAnuncios = async (reset: boolean = false) => {
    try {
      setLoading(true);
      const lastVisibleToUse = reset ? null : lastVisible;
      const { anuncios: nuevosAnuncios, lastVisible: nuevoLastVisible } =
        await obtenerAnunciosPaginados(lastVisibleToUse, ITEMS_PER_PAGE);

      if (reset) {
        setAnuncios(nuevosAnuncios);
        setFilteredAnuncios(nuevosAnuncios);
      } else {
        setAnuncios((prev) => [...prev, ...nuevosAnuncios]);
        setFilteredAnuncios((prev) => [...prev, ...nuevosAnuncios]);
      }

      setLastVisible(nuevoLastVisible);
      setHasMore(nuevosAnuncios.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError("Error al cargar los anuncios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAnuncios(true);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este anuncio?")) {
      try {
        await eliminarAnuncio(id);
        setAnuncios((prev) => prev.filter((anuncio) => anuncio.id !== id));
        setFilteredAnuncios((prev) =>
          prev.filter((anuncio) => anuncio.id !== id)
        );
        toast.success("Anuncio eliminado con éxito");
      } catch (err) {
        toast.error("Error al eliminar el anuncio");
        console.error(err);
      }
    }
  };

  const handleSearch = useCallback(
    debounce(async (term: string) => {
      if (term === "") {
        setFilteredAnuncios(anuncios);
        return;
      }
      try {
        setLoading(true);
        const resultados = await buscarAnuncios(term);
        setFilteredAnuncios(resultados.anuncios);
      } catch (err) {
        console.error("Error al buscar anuncios:", err);
        setFilteredAnuncios([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [anuncios]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleLoadMore = () => {
    cargarAnuncios();
  };

  return (
    <div className="lista-anuncios-container">
      <div className="container">
        <div className="header">
          <h1>Listado de Anuncios</h1>
          <div className="actions">
            <Link to="/admin/crear-anuncio">
              <button className="crear-button">Crear Nuevo Anuncio</button>
            </Link>
            <Link to="/admin">
              <button className="back-button">Volver</button>
            </Link>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <ul className="anuncios-list">
          {filteredAnuncios.map((anuncio) => (
            <li key={anuncio.id} className="anuncio-item">
              <div className="anuncio-info">
                <h2>{anuncio.title}</h2>
                <p>{anuncio.description}</p>
                <p>Precio: {anuncio.price}</p>
              </div>
              <div className="anuncio-actions">
                <button
                  onClick={() =>
                    navigate(`/admin/editar-anuncio/${anuncio.id}`)
                  }
                  className="edit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(anuncio.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        {loading && <div className="span-carga">Cargando anuncios...</div>}
        {!loading && hasMore && searchTerm.length === 0 && (
          <button onClick={handleLoadMore} className="load-more-button">
            Cargar más
          </button>
        )}
        {!loading &&
          !hasMore &&
          filteredAnuncios.length > 0 &&
          searchTerm.length === 0 && (
            <div className="span-carga">No hay más anuncios para cargar.</div>
          )}
        {!loading && filteredAnuncios.length === 0 && (
          <div className="span-carga">No se encontraron anuncios.</div>
        )}
        <Toaster />
      </div>
    </div>
  );
};
