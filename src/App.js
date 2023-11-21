import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from './Components/Search';
import Favorite from './Components/Favorite';
import Home from './Components/Home';
import TestCocktailDesign from './Components/TestCocktailDesign';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route
            exact path='/'
            element={
              <>
               {/* <TestCocktailDesign/> */}
               <Home/>
              </>
            }
          />
          <Route
            exact path='search'
            element={
              <>
                <Search/>
              </>
            }
          />
          <Route
            exact path='favorite'
            element={
              <>
                <Favorite />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
    
    

  );
}

export default App;
