import './App.css';
import { SearchBarComponent } from './SearchBarComponent';

function App() {
  return (
    <div className="App">
      <h1>&#127912; Virtual Met Gallery &#127912; </h1>
      <div className="search-area">
        <SearchBarComponent/>
        <div>SearchResults</div>
      </div>
    </div>
  );
}

export default App;
