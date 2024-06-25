import { NavLink } from "react-router-dom";
import { categorias } from "../../categorias";
import "../../styles/categorias/categorias.css";

export const Categorias = () => {
  return (
    <section className="categorias">
      <div className="categorias-content">
        <div className="categorias-list container-box">
          {categorias.map((category) => (
            <NavLink
              to={`/${category.id}`}
              key={category.id}
              className={({ isActive }) => (isActive ? "activeCategory" : "")}
            >
              <p>{category.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
