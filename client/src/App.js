import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom"
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from './pages/Home';
import ManagePets from './pages/shelter_pages/ManagePets';
import ViewApplications from './pages/shelter_pages/ViewApplications';
import PreviousAdoptions from './pages/shelter_pages/PreviousAdoptions';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage_pets" element={<ManagePets />} />
        <Route path="/view_applications" element={<ViewApplications />} />
        <Route path="/previous_adoptions" element={<PreviousAdoptions />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
