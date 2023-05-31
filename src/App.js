import logo from './logo.svg';
import Addhotel from './addhotel'
import Addroom from './addroom'
import Adduser from './adduser'

import ViewAllhotel from './view_delete_hotel'
import ViewAllroom from './view_delete_room'
import ViewAlluser from './view_delete_userinfo'

import Updatehotel from './updatehotel';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          {/* DashBoard */}
          <Route exact path='/' element={ < Home />} ></Route>

          {/* Auth Routes */}
          <Route path='/hotel'>
            <Route exact path='/hotel/addhotel' element={ <Addhotel />}></Route>
            <Route exact path='/hotel/view_delete_hotel' element={<ViewAllhotel />}></Route>
            <Route exact path='/hotel/updatehotel/:hotelId' element={<Updatehotel />}></Route>
            <Route exact path='/hotel/view_delete_room' element={<ViewAllroom />}></Route>
            <Route exact path='/hotel/addroom' element={<Addroom />}></Route>
            <Route exact path='/hotel/view_delete_userinfo' element={<ViewAlluser />}></Route>
            <Route exact path='/hotel/adduser' element={<Adduser />}></Route>

          </Route>


        </Routes>
        </Router>
    </div>
  );
}

export default App;
