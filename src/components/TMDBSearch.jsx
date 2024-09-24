import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Notifications from './Notifications';

function TMDBSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const apiKey = '4a972c1e12856c5e9b70fe137d6d8bbc'; // Replace with your TMDB API key

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNotification('');

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      setMovies(response.data.results);
      setNotification('Movies found successfully!');
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
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

      {loading && <Loader />}

      {error && <p className="error-message">{error}</p>}

      {!loading && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}

      <Notifications message={notification} />
    </div>
  );
}

export default TMDBSearch;
