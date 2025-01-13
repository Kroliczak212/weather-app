import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    onSearch(city.trim()); // Przekazanie nazwy miasta
    setCity(""); // Wyczyść pole tekstowe
    setError(""); // Wyczyść błąd
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchCity" className={styles.visuallyHidden}></label>
        <input
          id="searchCity"
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.searchInput}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={!city.trim()}
        >
          <span className={styles.searchIcon} role="img" aria-label="Search">
            🔍
          </span>
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SearchBar;
