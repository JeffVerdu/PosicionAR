import "../../styles/destacados/destacados.css";
import { Articulo } from "../common/Articulo";
import { articulos } from "../../articulos";
import Slider from "react-slick";

export const Destacados = () => {
  const destacadosArticles = articulos.slice(0, 10);

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
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <Slider {...settings}>
          {destacadosArticles.map((articulo) => (
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
