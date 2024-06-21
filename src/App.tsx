import { Categories } from "./components/categorias/Categories";
import { Contacto } from "./components/contacto/Contacto";
import { Destacados } from "./components/destacados/Destacados";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Destacados />
      <Categories />
      <Contacto />
    </>
  );
}

export default App;
