import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/homePage/HomePage';
import WordTable from './components/wordTable/ui/WordTable';
import WordList from './components/wordList/WordList';
import Missing from './components/missing/Missing';
import Loading from './components/loading/Loading';
import ErrorComponent from './components/error/ErrorComponent';

import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider, observer } from 'mobx-react';
import wordsStore from './stores/wordsStore';

const App = observer(() => {



  const { loading, error, updateError, addError, deleteError } = wordsStore;
  const addErrorMessage = 'Произошла ошибка при добавлении слова. Пожалуйста, повторите попытку позже...';
  const updateErrorMessage = 'Произошла ошибка при редактировании слова. Пожалуйста, повторите попытку позже...';
  const deleteErrorMessage = 'Произошла ошибка при удалении слова. Пожалуйста, повторите попытку позже...';



  let content;

  if (updateError) {
    content = <ErrorComponent message={updateErrorMessage} />;
  } else if (addError) {
    content = <ErrorComponent message={addErrorMessage} />;
  } else if (deleteError) {
    content = <ErrorComponent message={deleteErrorMessage} />;
  } else {
    content = <WordTable />;
  }

  return (
    <Provider wordsStore={wordsStore}>
      <Router>
        <div className="App">


          {error ? (
            <ErrorComponent message="Похоже произошла ошибка загрузки данных с сервера. Пожалуйста, повторите попытку позже..." />
          ) : loading ? (
            <Loading />
          ) : (
            <><Header />
              <Routes>
                <Route path="/list" element={content} />
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<WordList />} />
                <Route path="*" element={<Missing />} />
              </Routes>
              <Footer />
            </>
          )}

        </div>
      </Router>
    </Provider>
  );
});

export default App;
