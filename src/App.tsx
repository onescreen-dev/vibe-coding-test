import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import KeywordDetailPage from './pages/KeywordDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-politico-lightGray">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/keyword/:keyword" element={<KeywordDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
