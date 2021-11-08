import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Administrator from './Component/Administrator/Administrator';
import CreateFlight from './Component/Administrator/CreateFlight';
import Search from './Component/Administrator/Search';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Administrator />} />

          <Route path="/create" element={<CreateFlight />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;