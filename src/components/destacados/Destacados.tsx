import "../../styles/destacados/destacados.css";
import { CardBox } from "../common/CardBox";
import { articles } from "../../articles";

export const Destacados = () => {
  const destacadosArticles = articles.slice(0, 10);

  return (
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <div className="card-list">
          {destacadosArticles.map((article) => (
            <CardBox
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
