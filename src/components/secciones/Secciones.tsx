import { categorias } from "../../categorias";
import "../../styles/secciones/secciones.css";
import { ArticuloLista } from "../articulos/ArticuloLista";

export const Secciones = () => {
  return (
    <section className="secciones-container container-box">
      {categorias.map((categoria) => (
        <section key={categoria.id} className="categoria-seccion">
          <h2 className="categoria-title">{categoria.name}</h2>

          <div className="articulos-seccion">
            {<ArticuloLista categoriaId={categoria.id} />}
          </div>
        </section>
      ))}
    </section>
  );
};
