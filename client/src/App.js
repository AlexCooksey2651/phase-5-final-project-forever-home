import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from './pages/Home';
import ManagePets from './pages/shelter_pages/ManagePets';
import PetSearch from './pages/customer_pages/PetSearch';
import ViewApplications from './pages/shelter_pages/ViewApplications';
import MyApplications from "./pages/customer_pages/MyApplications";
import PreviousAdoptions from './pages/shelter_pages/PreviousAdoptions';
import BookmarkedPets from "./pages/customer_pages/BookmarkedPets"
import Profile from './pages/Profile';
import Login from './pages/Login';

const exampleCustomerUser = {
  email: "aecooksey2651@gmail.com",
  password: "hello",
  city: "Jersey City", 
  state: "NJ",
  phone_number: "+17203018361",
  profile_type: "customer",
  profile: {
    first_name: "Alex",
    last_name: "Cooksey",
    interested_in: ["Dog", "Cat", "Bird"]
  }
}

const exampleShelterUser = {
  email: "acooksey.hp@gmail.com",
  password: "hello",
  city: "New York City",
  state: "NY",
  phone_number: "+13148829097",
  profile_type: "shelter",
  profile: {
    name: "Awesome Dogs and Cats",
    bio: "We carry lots of Cats and Dogs in NYC"
  }
}
function App() {
  const [user, setUser] = useState(exampleCustomerUser)
  
  function handleLogout() {
    setUser(null)
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="App">
      <Header />
      <NavBar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-pets" element={<ManagePets user={user}/>} />
        <Route path="/search-pets" element={<PetSearch user={user}/>} />
        <Route path="/view-applications" element={<ViewApplications user={user}/>} />
        <Route path="/my-applications" element={<MyApplications user={user}/>} />
        <Route path="/bookmarked-pets" element={<BookmarkedPets user={user}/>} />
        <Route path="/previous-adoptions" element={<PreviousAdoptions user={user}/>} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
