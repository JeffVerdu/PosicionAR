import { useParams } from "react-router-dom";
import { categorias } from "../categorias.tsx";
import { articulos } from "../articulos.tsx";
import { useEffect, useState } from "react";
import { Articulo_Tipo, Categoria } from "../types";
import { Articulo } from "../components/common/Articulo.tsx";

import "../styles/articulos/articuloListaPorCategorita.css";
import { Destacados } from "../components/destacados/Destacados.tsx";

export const ArticuloListaPorCategoria = () => {
  const [categoria, setCategoria] = useState<Categoria>();
  const [articulosFiltrados, setArticulosFiltrados] = useState<Articulo_Tipo[]>(
    []
  );
  const params = useParams();

  const { categoriaId } = params;

  useEffect(() => {
    const categoriaEncontrada: Categoria | undefined = categorias.find(
      (categoria) => categoria.id === categoriaId
    );
    setCategoria(categoriaEncontrada);

    setArticulosFiltrados(
      articulos.filter((articulo) => articulo.category.id === categoriaId)
    );
  }, [params]);

  return (
    <section>
      <div
        className="sectionTitle-bg"
        style={{
          backgroundImage: ` linear-gradient(180deg, rgb(255 255 255 / 0) 50%, rgb(255 255 255) 100%), 
    url(${categoria?.image})`,
        }}
      ></div>

      <div className="articulosPorCategoria-list">
        {articulosFiltrados.map((articulo) => (
          <Articulo
            key={articulo.id}
            id={articulo.id}
            title={articulo.title}
            description={articulo.description}
            price={articulo.price}
            image={articulo.image}
          />
        ))}
      </div>

      <Destacados />
    </section>
  );
};
