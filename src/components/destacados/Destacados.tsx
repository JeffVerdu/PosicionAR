import { useEffect, useState } from "react";
import { Articulo } from "../common/Articulo";
import Slider from "react-slick";
import { Anuncio_Tipo } from "../../types";
import { obtenerAnuncios } from "../../services/firebaseServices";
import { Loading } from "../common/Loading";

import "../../styles/destacados/destacados.css";

export const Destacados = () => {
  const [destacados, setDestacados] = useState<Anuncio_Tipo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    const cargarAnuncios = async () => {
      try {
        const anuncios = await obtenerAnuncios();
        const obtenerDestacados = anuncios.filter(
          (anuncio) => anuncio.destacado === true
        );
        setDestacados(obtenerDestacados);
      } catch (error) {
        setError("Error al obtener los anuncios");
        console.error("Error al obtener los anuncios", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarAnuncios();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <Slider {...settings}>
          {destacados.map((articulo) => (
            <div key={articulo.id} className="articulo-slider">
              <Articulo
                id={articulo.id}
                title={articulo.title}
                description={articulo.description}
                price={articulo.price}
                image={articulo.poster}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
