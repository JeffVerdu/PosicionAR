import { articulos } from "../../articulos";
import { Articulo } from "../common/Articulo";
import "../../styles/articulos/articuloLista.css";

interface Props {
  categoriaId: string;
}

export const ArticuloLista = ({ categoriaId }: Props) => {
  return (
    <div className="articulo-list">
      {articulos.map(
        (articulo) =>
          articulo.category.id === categoriaId && (
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
