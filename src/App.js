import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Quran from './pages/Quran';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quran' element={<Quran />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
