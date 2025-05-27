import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Sök efter användare eller #hashtags"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Sök</button>
    </form>
  );
};

export default SearchBar;
