import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="nav">
        <NavLink to="/">Add Contact</NavLink>
        <NavLink to="/contacts">View Contacts</NavLink>
      </div>

      <Routes>
        <Route path="/" element={<AddContact />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;