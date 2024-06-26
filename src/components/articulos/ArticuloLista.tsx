import { articulos } from "../../articulos";
import { Articulo } from "../common/Articulo";
import "../../styles/articulos/articuloLista.css";
import Slider from "react-slick";

interface Props {
  categoriaId: string;
}

export const ArticuloLista = ({ categoriaId }: Props) => {
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
        {articulos.map(
          (articulo) =>
            articulo.category.id === categoriaId && (
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
