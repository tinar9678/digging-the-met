import './App.css';
import { SearchBarComponent } from './SearchBarComponent';

function App() {
  return (
    <div className="App">
      <div className="search-area">
        <SearchBarComponent/>
        <div>SearchResults</div>
      </div>
    </div>
  );
}

export default App;
