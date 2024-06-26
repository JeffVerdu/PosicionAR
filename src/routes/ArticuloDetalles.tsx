import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anunciante, Articulo_Tipo } from "../types";
import { articulos } from "../articulos";
import { anunciantes } from "../anunciantes";
import { Destacados } from "../components/destacados/Destacados";

import "../styles/articulos/articuloDetalles.css";
import { ImagesCarousel } from "../components/common/ImagesCarousel";

export const ArticuloDetalles = () => {
  const [articulo, setArticulo] = useState<Articulo_Tipo | undefined>(
    undefined
  );
  const [anunciante, setAnunciante] = useState<Anunciante | undefined>(
    undefined
  );
  const params = useParams();
  const { articuloId } = params;

  useEffect(() => {
    window.scrollTo(0, 0);

    const articuloEncontrado = articulos.find(
      (articulo) => articulo.id === articuloId
    );

    setArticulo(articuloEncontrado);

    const anuncianteEncontrado = anunciantes.find((anunciante) =>
      anunciante.anuncios.find((anuncio) => anuncio.id === articuloId)
    );

    setAnunciante(anuncianteEncontrado);
  }, [articuloId]);

  return (
    <>
      <div className="articuloDetalles container-box">
        {articulo ? (
          <div className="articuloDetalles-grid">
            <div className="articuloDetalles-carousel">
              <ImagesCarousel images={articulo.images} />
            </div>
            <div className="anunciante-contacto">
              <div className="articuloDetalles-text">
                <h3>{articulo.title}</h3>
                <p>{articulo.description}</p>
                <p>${articulo.price}</p>
                <p>{articulo.date.toLocaleDateString()}</p>
              </div>
              <div className="articuloDetalles-contacto">
                <h3>{anunciante?.name}</h3>
                <p>{anunciante?.tlf}</p>
                <p>{anunciante?.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <h3>Artículo no disponible</h3>
        )}
      </div>
      <Destacados />
    </>
  );
};
