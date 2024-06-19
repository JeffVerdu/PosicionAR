import "../../styles/common/button.css";

interface Props {
  text: string;
}

export const Button = ({ text }: Props) => {
  return <button className="button">{text}</button>;
};
