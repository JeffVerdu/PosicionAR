import { Search } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import React, { useEffect } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

import "../../styles/common/searchBar.css";

export const SearchBar = () => {
  const { setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const match = useMatch("/buscar/:searchTerm");
  const location = useLocation();

  useEffect(() => {
    if (!match) {
      setInputValue("");
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (/^[a-zA-Z0-9]*$/.test(inputValue)) {
      setSearchTerm(inputValue);
      navigate(`/buscar/${inputValue}`);
      setError(null);
    } else {
      setError("Solo letras y/o números");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search">
        <input
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Ej: 'Excursiones'"
          type="text"
          required
        />
        <button type="submit">
          <Search color="#ffffff" />
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
    </form>
  );
};
