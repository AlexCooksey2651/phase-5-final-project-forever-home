import React, { useEffect, useContext } from "react"
import { UserContext } from "./context/user";
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
// import { UserProvider } from "./context/user";

// const exampleCustomerUser = {
//   email: "aecooksey2651@gmail.com",
//   password: "hello",
//   city: "Jersey City",
//   state: "NJ",
//   phone_number: "+17203018361",
//   profile_type: "customer",
//   profile: {
//     first_name: "Alex",
//     last_name: "Cooksey",
//     interested_in: ["Dog", "Cat", "Bird"]
//   }
// }

// const exampleShelterUser = {
//   email: "acooksey.hp@gmail.com",
//   password: "hello",
//   city: "New York City",
//   state: "NY",
//   phone_number: "+13148829097",
//   profile_type: "shelter",
//   profile: {
//     name: "Awesome Dogs and Cats",
//     bio: "We carry lots of Cats and Dogs in NYC"
//   }
// }
function App() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  }, [])
  
  function handleLogout() {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          setUser(null)
        }
      })
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="App">

      <Header />
      <NavBar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-pets" element={<ManagePets />} />
        <Route path="/search-pets" element={<PetSearch />} />
        <Route path="/view-applications" element={<ViewApplications />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/bookmarked-pets" element={<BookmarkedPets />} />
        <Route path="/previous-adoptions" element={<PreviousAdoptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
