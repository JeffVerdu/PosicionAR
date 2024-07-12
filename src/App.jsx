import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { Navbar } from "./components/navbar/Navbar";
import { Categorias } from "./components/categorias/Categorias";
import { Main } from "./routes/Main";
import { ArticuloListaPorCategoria } from "./routes/ArticuloListaPorCategoria";
import { Contacto } from "./routes/Contacto";
import { ArticuloDetalles } from "./routes/ArticuloDetalles";
import { ArticuloPorBusqueda } from "./routes/ArticuloPorBusqueda";
import { Footer } from "./components/footer/Footer";
import { Login } from "./routes/Login.tsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { PaginaAdmin } from "./routes/PaginaAdmin.jsx";
import { CrearAnuncio } from "./routes/CrearAnuncio.tsx";
import { EditarAnuncio } from "./routes/EditarAnuncio.tsx";
import { ListarAnuncios } from "./routes/ListarAnuncios.tsx";

function App() {
  const [showLayout, setShowLayout] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const showLayoutPaths = ["/login", "/admin", "/admin/nuevo-anuncio"];

    path.sta;

    if (
      showLayoutPaths.includes(path) ||
      path.includes("/admin/editar-anuncio")
    ) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [location]);

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          {showLayout && <Navbar />}
          {showLayout && <Categorias />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/categoria/:categoriaId"
              element={<ArticuloListaPorCategoria />}
            />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="/articulo/:articuloId"
              element={<ArticuloDetalles />}
            />
            <Route
              path="/buscar/:searchTerm"
              element={<ArticuloPorBusqueda />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <PaginaAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/nuevo-anuncio"
              element={
                <ProtectedRoute>
                  <CrearAnuncio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editar-anuncio"
              element={
                <ProtectedRoute>
                  <ListarAnuncios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editar-anuncio/:articuloId"
              element={
                <ProtectedRoute>
                  <EditarAnuncio />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<Main />} />
          </Routes>
          {showLayout && <Footer />}
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;
