import Slider from "react-slick";

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
        <div key={index} className="imageCarousel">
          <img src={image} alt={`imagen ${index}`} />
        </div>
      ))}
    </Slider>
  );
};
