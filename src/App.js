import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Users from './pages/Userlist/userlist'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
