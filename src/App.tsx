import { Categorias } from "./components/categorias/Categorias";
import { Destacados } from "./components/destacados/Destacados";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Secciones } from "./components/secciones/Secciones";

function App() {
  return (
    <>
      <Navbar />
      <Categorias />
      <Destacados />
      <h2 className="section-title">Anuncios</h2>
      <Secciones />
      <Footer />
    </>
  );
}

export default App;
