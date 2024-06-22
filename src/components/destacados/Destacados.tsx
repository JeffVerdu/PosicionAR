import "../../styles/destacados/destacados.css";
import { Article } from "../common/Article";
import { articles } from "../../articles";

export const Destacados = () => {
  const destacadosArticles = articles.slice(0, 10);

  return (
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <div className="destacados-list">
          {destacadosArticles.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              price={article.price}
              image={article.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
