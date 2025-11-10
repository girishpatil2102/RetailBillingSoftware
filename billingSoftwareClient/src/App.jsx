import { Routes, Route } from 'react-router-dom';
import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import ManageUsers from "./pages/ManageUsers/ManageUsers";

const App = () => {
  return(
    
    <div>
      <MenuBar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-categories" element={<ManageCategories />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </div>
  )
}
export default App;