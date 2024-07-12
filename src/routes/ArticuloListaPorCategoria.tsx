import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Anuncio_Tipo, Categoria } from "../types";
import { Articulo } from "../components/common/Articulo.tsx";
import { Destacados } from "../components/destacados/Destacados.tsx";
import {
  obtenerAnuncios,
  obtenerCategorias,
} from "../services/firebaseServices.ts";
import { Loading } from "../components/common/Loading.tsx";

import "../styles/articulos/articuloListaPorCategorita.css";

const categoriaInicial: Categoria = {
  id: "",
  key: "",
  name: "",
  image: "",
};

export const ArticuloListaPorCategoria = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>(categoriaInicial);
  const [articulosFiltrados, setArticulosFiltrados] = useState<Anuncio_Tipo[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const params = useParams();

  const { categoriaId } = params;

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

  useEffect(() => {
    let categoriaEncontrada: Categoria | undefined = undefined;

    if (categorias.length > 0 && categoriaId) {
      categoriaEncontrada = categorias.find(
        (categoria) => categoria.key === categoriaId
      );
    }
    if (categoriaEncontrada) {
      setCategoria(categoriaEncontrada);
      const cargarArticulos = async () => {
        try {
          const articulos = await obtenerAnuncios();
          setArticulosFiltrados(
            articulos.filter(
              (articulo) => articulo.category === categoriaEncontrada.id
            )
          );
        } catch (error) {
          setError("Error al obtener los anuncios");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      cargarArticulos();
    }
  }, [categorias, categoriaId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      {categoria.image && (
        <div
          className="sectionTitle-bg"
          style={{
            backgroundImage: ` linear-gradient(180deg, rgb(255 255 255 / 0), rgb(255 255 255) 100%), 
                            url(${categoria.image})`,
          }}
        ></div>
      )}

      <div className="articulosPorCategoria-list">
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

      <Destacados />
    </section>
  );
};
