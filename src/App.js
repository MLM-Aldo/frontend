import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard/dashboard';
import LevelTree from "./pages/Leveltree/Leveltree";
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Users from './pages/Userlist/userlist';
import UserProfile from './pages/userprofile/userprofile';
import UserSettings from './pages/usersetting/usersetting';
import BlockedUsers from './pages/blockeduser/blockeduser';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />          
          <Route path="/leveltree" element={<LevelTree />} />          
          <Route path="/userprofile" element={<UserProfile />} />    
          <Route path="/blockeduser" element={<BlockedUsers />} />

          <Route path="/" element={<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
