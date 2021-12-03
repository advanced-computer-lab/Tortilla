import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Administrator from './Component/Administrator/Administrator';
import CreateFlight from './Component/Administrator/CreateFlight';
import Search from './Component/Administrator/Search';
import User from './Component/User/User';
import EditUserInfo from './Component/User/EditUserInfo';
import AvailableFlights from './Component/AvailableFlights';
import UserSearch from './Component/User/UserSearch';
import ReservedFlights from './Component/User/ReservedFlights';
import Summary from './Component/User/Summary';
import Seats from './Component/User/Seats';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />

          <Route path="/reservedFlights" element={<ReservedFlights />} />
          <Route path="/create" element={<CreateFlight />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userSearch" element={<UserSearch />} />
          <Route path="/editUserInfo" element={<EditUserInfo />} />
          <Route path="/availableFlights" element={<AvailableFlights />} />
          <Route path="/admin" element={<Administrator />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/Seats" element={<Seats />} />

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;