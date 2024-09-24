import Slider from "react-slick";
import "../../styles/common/imagesCarousel.css";
import { useEffect } from "react";

interface Props {
  media?: string[]; // Puede contener tanto imágenes como videos
}

export const ImagesCarousel = ({ media }: Props) => {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Función para determinar si es un video
  const isVideo = (file: string) => {
    // Dividir la URL por el símbolo "?" para ignorar los parámetros de consulta
    const fileName = file.split("?")[0];

    // Comprobar si la URL (sin parámetros) tiene una extensión de video
    return /\.(mp4|webm|ogg|mov|m4v|3gp)$/i.test(fileName);
  };

  useEffect(() => {
    media?.forEach((item) => {
      console.log(isVideo(item));
    });
  }, []);

  return (
    <Slider {...settings}>
      {(media ?? []).map((file, index) => (
        <div key={index} className="carousel-item">
          {isVideo(file) ? (
            <video controls className="carousel-media" preload="metadata">
              <source src={file} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          ) : (
            <img src={file} alt={`media ${index}`} className="carousel-media" />
          )}
        </div>
      ))}
    </Slider>
  );
};
