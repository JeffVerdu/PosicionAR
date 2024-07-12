import { Articulo } from "../common/Articulo";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Anuncio_Tipo } from "../../types";
import { obtenerAnuncios } from "../../services/firebaseServices";
import { Loading } from "../common/Loading";

import "../../styles/articulos/articuloLista.css";

interface Props {
  categoriaId: string;
}

export const ArticuloLista = ({ categoriaId }: Props) => {
  const [articulosCategoria, setArticulosCategoria] = useState<Anuncio_Tipo[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        const anuncios = await obtenerAnuncios();
        const obtenerPorCategoria = anuncios.filter(
          (anuncio) => anuncio.category === categoriaId
        );
        setArticulosCategoria(obtenerPorCategoria);
      } catch (error) {
        setError("Error al obtener los anuncios");
        console.error("Error al obtener los anuncios", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarArticulos();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  let settings = {
    className: "center",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="articulo-list">
      <Slider {...settings} className="slider-container">
        {articulosCategoria.map(
          (articulo) =>
            articulo.category === categoriaId && (
              <div key={articulo.id} className="articulo-slider">
                <Articulo
                  id={articulo.id}
                  title={articulo.title}
                  description={articulo.description}
                  price={articulo.price}
                  image={articulo.poster}
                />
              </div>
            )
        )}
      </Slider>
    </div>
  );
};
