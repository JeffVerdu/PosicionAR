import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anunciante, Articulo_Tipo } from "../types";
import { articulos } from "../articulos";
import { anunciantes } from "../anunciantes";
import { Destacados } from "../components/destacados/Destacados";

import "../styles/articulos/articuloDetalles.css";
import { ImagesCarousel } from "../components/common/ImagesCarousel";
import { PhoneOutgoing, Send } from "lucide-react";

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
                <p className="articuloDetalles-description">
                  {articulo.details}
                </p>
                <p className="articuloDetalles-precio">
                  Precio: ${articulo.price}
                </p>
                <p className="articuloDetalles-fecha">
                  Fecha de publicación: {articulo.date.toLocaleDateString()}
                </p>
              </div>
              <div className="articuloDetalles-contacto">
                <h3>Datos del anunciante</h3>
                <p>Nombre: {anunciante?.name}</p>
                <a
                  href={`tel:${anunciante?.tlf}`}
                  className="articuloDetalles-tlf"
                >
                  Teléfono: {anunciante?.tlf}
                  <div>
                    <PhoneOutgoing color="#212529" size={20} />
                  </div>
                </a>
                <a
                  href={`mailto:${anunciante?.email}`}
                  className="articuloDetalles-email"
                >
                  Correo: {anunciante?.email}
                  <div>
                    <Send color="#212529" size={20} />
                  </div>
                </a>
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
