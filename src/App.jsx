import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/homePage/HomePage';
import WordTable from './components/wordTable/WordTable';
import WordList from './components/wordList/WordList';
import Missing from './components/missing/Missing';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {



  return (

    <Router>

      <div className="App">
        <Header />
        <Routes>
          <Route path="/list" element={<WordTable />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<WordList />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div>

    </Router>

  );
}

export default App;
