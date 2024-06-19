import "../../styles/destacados/destacados.css";
import { CardBox } from "../common/CardBox";

export const Destacados = () => {
  return (
    <section className="destacados section-box">
      <div className="destacados-content container-box">
        <h2 className="destacados-title">Destacados</h2>

        <div className="card-list">
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
        </div>
      </div>
    </section>
  );
};
