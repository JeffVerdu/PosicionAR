import { articles } from "../../articles";
import { Article } from "../common/Article";
import "../../styles/articles/cardBoxList.css";

interface Props {
  id: string;
}

export const ArticleList = ({ id }: Props) => {
  return (
    <div className="article-list">
      {articles.map(
        (article) =>
          article.category.id === id && (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              price={article.price}
              image={article.image}
            />
          )
      )}
    </div>
  );
};
