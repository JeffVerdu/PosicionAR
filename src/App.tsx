import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Main } from "./routes/Main";
import { Contacto } from "./components/contacto/Contacto";
import { ArticuloListaPorCategoria } from "./components/articulos/ArticuloListaPorCategoria";
import { Categorias } from "./components/categorias/Categorias";

function App() {
  return (
    <>
      <Navbar />
      <Categorias />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:categoriaId" element={<ArticuloListaPorCategoria />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
