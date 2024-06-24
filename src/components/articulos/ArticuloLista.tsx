import { articulos } from "../../articulos";
import { Articulo } from "../common/Articulo";
import "../../styles/articulos/articuloLista.css";

interface Props {
  cateogoriaId: string;
}

export const ArticuloLista = ({ cateogoriaId }: Props) => {
  return (
    <div className="articulo-list">
      {articulos.map(
        (articulo) =>
          articulo.category.id === cateogoriaId && (
            <Articulo
              key={articulo.id}
              id={articulo.id}
              title={articulo.title}
              description={articulo.description}
              price={articulo.price}
              image={articulo.image}
            />
          )
      )}
    </div>
  );
};
