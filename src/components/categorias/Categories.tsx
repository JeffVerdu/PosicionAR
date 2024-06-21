import { useState } from "react";
import { Category } from "../../types";
import "../../styles/categorias/categories.css";
import { ArticleList } from "../articles/ArticleList";

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("1");

  const categories: Category[] = [
    { id: "1", name: "Artículos" },
    { id: "2", name: "Servicios" },
    { id: "3", name: "Experiencias" },
    { id: "4", name: "Entretenimiento" },
    { id: "5", name: "Deportes" },
    { id: "6", name: "Gastronomía" },
  ];

  const handleActiveCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="section-box categories">
      <div className="categories-content">
        <h2 className="section-title">Anuncios</h2>

        <div className="categories-list container-box">
          {categories.map((category) => (
            <p
              key={category.id}
              className={`category ${
                activeCategory === category.id && "active-category"
              }`}
              onClick={() => handleActiveCategory(category.id)}
            >
              {category.name}
            </p>
          ))}
        </div>

        <ArticleList id={activeCategory} />
      </div>
    </section>
  );
};
