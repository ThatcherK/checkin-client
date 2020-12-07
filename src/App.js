import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavigation from './routes/MainNavigation';
import Data from './context/data'

function App() {
  return (
    <div className="App">
      <Router>
        <Data>
          <MainNavigation />
        </Data>
        </Router>

    </div>
  );
}

export default App;
