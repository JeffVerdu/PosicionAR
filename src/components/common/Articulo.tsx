import Card from "react-bootstrap/Card";
import "../../styles/common/articulo.css";
import { Boton } from "./Boton";

interface Props {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const Articulo = ({ title, description, price, image }: Props) => {
  const handleClick = () => {
    console.log("Más detalles");
  };

  return (
    <Card className="articulo">
      <Card.Img variant="top" src={image} className="articulo-image" />
      <Card.Body>
        <Card.Title className="articulo-title">{title}</Card.Title>
        <Card.Text className="articulo-text">{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="articulo-footer">
        <Card.Text className="articulo-price">${price}</Card.Text>
        <Boton text="Más detalles" onClick={handleClick} />
      </Card.Footer>
    </Card>
  );
};
