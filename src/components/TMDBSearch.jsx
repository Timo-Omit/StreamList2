import { useState } from 'react';
import axios from 'axios';

function TMDBSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');  // Error state

  const apiKey = '4a972c1e12856c5e9b70fe137d6d8bbc'; // Replace with your TMDB API key

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when search starts
    setError('');  // Reset any previous error messages

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      setMovies([]);  // Clear previous movie results on error
    } finally {
      setLoading(false);  // Set loading to false when the request is done
    }
  };

  return (
    <div>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for a movie..." 
        />
        <button type="submit">Search</button>
      </form>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display movie results if any */}
      <div>
        {movies.length > 0 && !loading && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TMDBSearch;
