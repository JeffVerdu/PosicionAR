import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <form className="search">
      <input placeholder="Ej: 'Excursiones'" type="text" required />
      <button type="submit">
        <Search color="#ffffff" />
      </button>
    </form>
  );
};
