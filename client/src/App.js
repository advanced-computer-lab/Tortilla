import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Administrator from './Component/Administrator/Administrator';
import CreateFlight from './Component/Administrator/CreateFlight';
import Search from './Component/Administrator/Search';
import User from './Component/User/User';
import EditUserInfo from './Component/User/EditUserInfo';
import AvailableFlights from './Component/AvailableFlights';
import UserSearch from './Component/User/UserSearch';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Administrator />} />
          
          <Route path="/create" element={<CreateFlight />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userSearch" element={<UserSearch />} />
          <Route path="/user" element={<User />} />
          <Route path="/editUserInfo" element={<EditUserInfo />} />
          <Route path="/availableFlights" element={<AvailableFlights />} />

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;