import Card from "react-bootstrap/Card";
import "../../styles/common/articulo.css";
import { Boton } from "./Boton";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  description: string;
  price: number | string;
  image: string;
}

export const Articulo = ({ id, title, description, price, image }: Props) => {
  return (
    <Card className="articulo">
      <Card.Img variant="top" src={image} className="articulo-image" />
      <Card.Body>
        <Card.Title className="articulo-title">{title}</Card.Title>
        <Card.Text className="articulo-text">{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="articulo-footer">
        <Card.Text className="articulo-price">${price}</Card.Text>
        <Link to={`/articulo/${id}`}>
          <Boton text="Más detalles" />
        </Link>
      </Card.Footer>
    </Card>
  );
};
