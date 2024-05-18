import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/homePage/HomePage';
import WordTable from './components/wordTable/ui/WordTable';
import WordList from './components/wordList/WordList';
import Missing from './components/missing/Missing';

import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { WordsProvider } from './wordsContext/WordsContext';



function App() {



  return (
    <WordsProvider>
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
    </WordsProvider>
  );
}

export default App;
