import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Postform from './components/Postform';
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/get" element={<Home />} />
        <Route exact path="/add-form" element={<Postform/>} />
      </Routes>
    </div>
  );
};

export default App;