import Card from "react-bootstrap/Card";

import "../../styles/common/cardbox.css";
import { Button } from "./Button";

export const CardBox = () => {
  return (
    <Card className="cardbox">
      <Card.Img
        variant="top"
        src="https://vamosmendoza.com/wp-content/uploads/2018/08/990487_axdourldbaabcvta-1.jpg"
        className="cardbox-image"
      />
      <Card.Body>
        <Card.Title className="cardbox-title">
          Excursión al Manzano Histórico
        </Card.Title>
        <Card.Text className="cardbox-text">
          Disfruta de un día espectacular, conociendo uno de los lugares más
          emblemáticos de todo el Valle de Uco
        </Card.Text>
        <Button text="Más detalles" />
      </Card.Body>
    </Card>
  );
};
