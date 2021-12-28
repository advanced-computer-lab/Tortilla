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
import { useEffect, useState } from 'react';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import Logout from './Component/User/Logout';
import Change from './Component/User/Change';
import ChangePassword from './Component/User/ChangePassword';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  function Authenticated() {
    if (localStorage.getItem("user-token") != null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }

  useEffect(() => {
    Authenticated();
  }, []);

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {isAuth ? <Route path="/reservedFlights" element={<ReservedFlights />} /> : <Route path="/" element={<User />} />}
          {isAuth ? <Route path="/editUserInfo" element={<EditUserInfo />} /> : <Route path="/" element={<User />} />}
          {isAuth ? <Route path="/Seats" element={<Seats />} /> : <Route path="/" element={<User />} />}
          {isAuth ? <Route path="/change" element={<Change />} /> : <Route path="/" element={<User />} />}
          {isAuth ? <Route path="/changepassword" element={<ChangePassword />} /> : <Route path="/" element={<User />} />}


          <Route path="/userSearch" element={<UserSearch />} />
          <Route path="/availableFlights" element={<AvailableFlights />} />
          <Route path="/Summary" element={<Summary />} />

          <Route path="/admin" element={<Administrator />} />
          <Route path="/create" element={<CreateFlight />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;