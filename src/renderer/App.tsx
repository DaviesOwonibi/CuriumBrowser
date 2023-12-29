import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainBrowser from './components/MainBrowser';

function Hello() {
  return <MainBrowser />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

