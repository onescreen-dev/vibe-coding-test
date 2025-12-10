import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import KeywordDetailPage from './pages/KeywordDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
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
