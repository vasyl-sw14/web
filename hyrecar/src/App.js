import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddCar from "./components/AddCar";
import MyCars from "./components/MyCars";
import EditCar from "./components/EditCar";
import MyRents from "./components/MyRents";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addCar" element={<AddCar />} />
        <Route exact path="/myCars" element={<MyCars />} />
        <Route exact path="/editCar/:id" element={<EditCar />} />
        <Route exact path="/myRentals" element={<MyRents />} />
      </Routes>
    </Router>
  );
}

export default App;
