import React, { useContext} from 'react'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Topbar from './components/topbar/Topbar';
import Friends from './pages/friends/Friends';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Bookmark from './pages/bookMark/Bookmark';
import ProfileEdit from './pages/profile/ProfileEdit';



const App = () => {
  const {user}=useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">{user?<Redirect to="/"/>:<Login/>}</Route>
          <Route exact path="/register"><Register/></Route>
          <Route exact path="/">
              {user?<div><Topbar /><Home/>
                </div>:<Login/>}
            </Route>
          <Route exact path="/friends"><Topbar/><Friends/></Route>
          <Route exact path="/profile/:id"><Topbar/><Profile/></Route>
          <Route exact path="/bookmark"><Topbar/><Bookmark/></Route>
          <Route exact path="/profile/:id/edit"><Topbar/><Profile/><ProfileEdit/></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
