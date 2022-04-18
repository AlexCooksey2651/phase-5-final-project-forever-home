import React, { useEffect, useContext, useState } from "react"
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

function App() {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([])

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
        } else {
          r.json().then(errors => setErrors(errors))
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
        <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
