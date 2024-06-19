import { Categories } from "./components/categorias/Categories";
import { Destacados } from "./components/destacados/Destacados";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Destacados />
      <Categories />
    </>
  );
}

export default App;
