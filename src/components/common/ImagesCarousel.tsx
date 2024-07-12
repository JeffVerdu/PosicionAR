import Slider from "react-slick";

import "../../styles/common/imagesCarousel.css";

interface Props {
  images?: string[];
}

export const ImagesCarousel = ({ images }: Props) => {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {(images ?? []).map((image, index) => (
        <div key={index} className="carousel-item">
          <img src={image} alt={`imagen ${index}`} />
        </div>
      ))}
    </Slider>
  );
};
