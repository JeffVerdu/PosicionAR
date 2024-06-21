import Card from "react-bootstrap/Card";
import "../../styles/common/article.css";
import { Button } from "./Button";

interface Props {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export const Article = (props: Props) => {
  return (
    <Card className="article">
      <Card.Img variant="top" src={props.image} className="article-image" />
      <Card.Body>
        <Card.Title className="article-title">{props.title}</Card.Title>
        <Card.Text className="article-text">{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="article-footer">
        <Card.Text className="article-price">${props.price}</Card.Text>
        <Button text="Más detalles" />
      </Card.Footer>
    </Card>
  );
};
