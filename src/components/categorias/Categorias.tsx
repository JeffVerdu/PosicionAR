import { categorias } from "../../categorias";
import "../../styles/categorias/categorias.css";

export const Categorias = () => {
  const handleClick = () => {};

  return (
    <section className="categorias">
      <div className="categorias-content">
        <div className="categorias-list container-box">
          {categorias.map((category) => (
            <p
              key={category.id}
              className="category"
              onClick={() => handleClick()}
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
