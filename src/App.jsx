import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './page/home/HomePage';
import SignInPage from './page/auth/SignInPage';
import SignUpPage from './page/auth/SignUpPage';
import ZakatFitrahPage from './page/zakat/fitrah/ZakatFitrahPage';
import ZakatMaalPage from './page/zakat/maal/ZakatMaalPage';
import ZakatFidyahPage from './page/zakat/fidyah/ZakatFidyahPage';
import MustahikPage from './mustahik/MustahikPage';
import StatsPage from './page/stats/StatsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<StatsPage />} />
        <Route path="/mustahik" element={<MustahikPage />} />

        <Route path="/zakat-fitrah" element={<ZakatFitrahPage />} />
        <Route path="/zakat-maal" element={<ZakatMaalPage />} />
        <Route path="/zakat-fidyah" element={<ZakatFidyahPage />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;