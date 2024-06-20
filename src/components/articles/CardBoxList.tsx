import { articles } from "../../articles";
import { CardBox } from "../common/CardBox";
import "../../styles/articles/cardBoxList.css";

interface Props {
  id: string;
}

export const CardBoxList = ({ id }: Props) => {
  return (
    <div className="article-list">
      {articles.map(
        (article) =>
          article.category.id === id && (
            <CardBox
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
