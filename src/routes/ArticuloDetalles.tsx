import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anuncio_Tipo } from "../types";
import { Destacados } from "../components/destacados/Destacados";
import { ImagesCarousel } from "../components/common/ImagesCarousel";
import { PhoneOutgoing, Send } from "lucide-react";
import { obtenerAnuncioPorId } from "../services/firebaseServices";
import { Timestamp } from "firebase/firestore";
import { Loading } from "../components/common/Loading";

import "../styles/articulos/articuloDetalles.css";

export const ArticuloDetalles = () => {
  const [articulo, setArticulo] = useState<Anuncio_Tipo | undefined>(undefined);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const params = useParams();
  const { articuloId } = params;

  useEffect(() => {
    window.scrollTo(0, 0);

    const cargarArticulo = async () => {
      try {
        const articuloObtenido = await obtenerAnuncioPorId(articuloId!);
        if (articuloObtenido.date instanceof Timestamp) {
          articuloObtenido.date = articuloObtenido.date.toDate();
        }

        if (articuloObtenido) {
          const todasImagenes = [
            articuloObtenido.poster, // Verifica que no sea nulo
            ...(articuloObtenido.images ?? []),
          ].filter(Boolean); // Esto eliminará cualquier valor "falso" como null o undefined
          setImagenes(todasImagenes);
          setArticulo(articuloObtenido);
        }
      } catch (error) {
        setError("Error al obtener el artículo");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarArticulo();
  }, [articuloId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="articuloDetalles container-box">
        {articulo ? (
          <div className="articuloDetalles-grid">
            <div className="articuloDetalles-carousel">
              {imagenes.length > 0 ? (
                <ImagesCarousel media={imagenes} />
              ) : (
                <p>No hay imágenes ni videos disponibles.</p>
              )}
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
                  Fecha de publicación:{" "}
                  {articulo.date
                    ? articulo.date.toLocaleDateString()
                    : "No disponible"}
                </p>
              </div>
              <div className="articuloDetalles-contacto">
                <h3>Datos del anunciante</h3>
                <p>Nombre: {articulo.anunciante.name}</p>
                <a
                  href={`tel:${articulo.anunciante.tlf}`}
                  className="articuloDetalles-tlf"
                >
                  Teléfono: {articulo.anunciante.tlf}
                  <div>
                    <PhoneOutgoing color="#212529" size={20} />
                  </div>
                </a>
                <a
                  href={`mailto:${articulo.anunciante.email}`}
                  className="articuloDetalles-email"
                >
                  Correo: {articulo.anunciante.email}
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
