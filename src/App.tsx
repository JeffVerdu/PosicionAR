import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Main } from "./routes/Main";
import { Contacto } from "./routes/Contacto";
import { ArticuloListaPorCategoria } from "./routes/ArticuloListaPorCategoria";
import { Categorias } from "./components/categorias/Categorias";
import { ArticuloDetalles } from "./routes/ArticuloDetalles";

function App() {
  return (
    <>
      <Navbar />
      <Categorias />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:categoriaId" element={<ArticuloListaPorCategoria />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/articulo/:articuloId" element={<ArticuloDetalles />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
