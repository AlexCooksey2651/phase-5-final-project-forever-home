import React, { useEffect, useState, useContext } from "react"
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
import MessageContainer from './pages/MessageContainer'

function App() {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState(null)

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

  if (!user) return <Login onLogin={setUser}/>

  return (
    <div className="App">
      <Header />
      <NavBar handleLogout={handleLogout} user={user}/>
      <Routes>
        <Route path="/home" element={<Home user={user}/>} />
        <Route path="/manage-pets" element={<ManagePets user={user}/>} />
        <Route path="/search-pets" element={<PetSearch user={user}/>} />
        <Route path="/view-applications" element={<ViewApplications user={user}/>} />
        <Route path="/my-applications" element={<MyApplications user={user}/>} />
        <Route path="/bookmarked-pets" element={<BookmarkedPets user={user}/>} />
        <Route path="/previous-adoptions" element={<PreviousAdoptions user={user}/>} />
        <Route path="/profile" element={<Profile handleLogout={handleLogout} user={user}/>} />
        <Route path="/messages" element={<MessageContainer user={user}/>} />
        <Route path="/login" element={<Login onLogin={setUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
