import "../../styles/common/boton.css";

interface Props {
  text: string;
  onClick?: () => void;
}

export const Boton = ({ text, onClick }: Props) => {
  return (
    <button className="boton" onClick={onClick}>
      {text}
    </button>
  );
};
