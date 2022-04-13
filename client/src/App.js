import React, { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from './pages/Home';
import ManagePets from './pages/shelter_pages/ManagePets';
import ViewApplications from './pages/shelter_pages/ViewApplications';
import PreviousAdoptions from './pages/shelter_pages/PreviousAdoptions';
import Profile from './pages/Profile';
import Login from './pages/Login';

const exampleCustomerUser = {
  email: "aecooksey2651@gmail.com",
  password: "hello",
  profile_type: "customer",
  profile: {
    first_name: "Alex",
    last_name: "Cooksey",
    interested_in: ["Dog", "Cat", "Bird"]
  }
}

const exampleShelterrUser = {
  email: "acooksey.hp@gmail.com",
  password: "hello",
  profile_type: "shelter",
  profile: {
    name: "Awesome Dogs and Cats",
    bio: "We carry lots of Cats and Dogs in NYC"
  }
}
function App() {
  const [user, setUser] = useState("Alex")
  
  function handleLogout() {
    setUser(null)
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="App">
      <Header />
      <NavBar handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage_pets" element={<ManagePets />} />
        <Route path="/view_applications" element={<ViewApplications />} />
        <Route path="/previous_adoptions" element={<PreviousAdoptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
