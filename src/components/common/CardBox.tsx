import Card from "react-bootstrap/Card";
import "../../styles/common/cardbox.css";
import { Button } from "./Button";

interface Props {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const CardBox = (props: Props) => {
  return (
    <Card className="cardbox">
      <Card.Img variant="top" src={props.image} className="cardbox-image" />
      <Card.Body>
        <Card.Title className="cardbox-title">{props.title}</Card.Title>
        <Card.Text className="cardbox-text">{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="cardbox-footer">
        <Card.Text className="cardbox-price">${props.price}</Card.Text>
        <Button text="Más detalles" />
      </Card.Footer>
    </Card>
  );
};
