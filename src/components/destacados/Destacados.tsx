import "../../styles/destacados/destacados.css";
import { Articulo } from "../common/Articulo";
import { articulos } from "../../articulos";

export const Destacados = () => {
  const destacadosArticles = articulos.slice(0, 10);

  return (
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <div className="destacados-list">
          {destacadosArticles.map((articulo) => (
            <Articulo
              key={articulo.id}
              id={articulo.id}
              title={articulo.title}
              description={articulo.description}
              price={articulo.price}
              image={articulo.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
