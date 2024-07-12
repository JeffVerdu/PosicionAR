import { Destacados } from "../components/destacados/Destacados";
import { Secciones } from "../components/secciones/Secciones";

export const Main = () => {
  return (
    <>
      <Destacados />
      <h2 className="section-title">Explora anuncios</h2>
      <Secciones />
    </>
  );
};
