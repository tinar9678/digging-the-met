import { useState } from 'react';
import './App.css';
import { SearchBarComponent } from './Components/SearchBarComponent';
import { Gallery } from './Components/Gallery';
import { FilterComponent } from './Components/FilterComponent';

function App() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState(results); // Initialize with results
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <h1>&#127912; Virtual Met Gallery &#127912; </h1>
      <div className="search-area">
        <SearchBarComponent setResults={setResults} setLoading={setLoading}/>
        <FilterComponent artObjects={results} setFilteredResults={setFilteredResults}/>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>Search Results - displaying {filteredResults.length}</div>
            <Gallery results={filteredResults} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;