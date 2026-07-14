import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from 'react';

//data will be the string we send from our server
const apiCall = () =>{
  axios.get('http://localhost:8080').then((data) => {
    console.log(data);
  })
}

// classname is used to group the text and stuff together in order to change the style of it all
function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <DropdownMenu />
        <SigninButton />
        <HomepageLogoButton />
        <SearchBar />
      </header>
      <div className="App-body">
        <LeaderboardBox />
      </div>
    </div>
  );
}
function DropdownMenu(){
  return(
    <Dropdown>
      <Dropdown.Toggle className = "Dropdown-menu" id="dropdown-basic">
        Sports
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">NBA</Dropdown.Item>
        <Dropdown.Item href="#/action-2">ATP Tour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
function SigninButton(){
  return(
    <button className = "Button-signin">
      Sign In 
      </button>
  );
}
function HomepageLogoButton(){
  return(
    <a href = "/" className = "Button-homepageLogo">
      <img src = "logo192.png" alt = "Logo of website that sends them back to the homepage" className = "logo-homepage"></img>
    </a>
  );
}
function SearchBar(){
  return(
    <input
      type="text"
      placeholder="Search Teams, Players, and Stats"
      className="searchBar"
    />
  );
}
function LeaderboardBox(){
  const [selectedLeague, setSelectedLeague] = useState("NBA");
  const leaderboardData = {
    NBA: ["1. Thunder", "2. Nuggets", "3. Celtics"],
    ATP: ["1. Jannik Sinner", "2. Carlos Alcaraz", "3. Alexander Zverev"]
  }
  return(
    <div className = "body-sportLeaderboard">
      <select value = {selectedLeague} onChange={(e)=>setSelectedLeague(e.target.value)} className = "body-sportLeaderboardButton" style={{ width: `${selectedLeague.length + 4}ch` }}
      >
        <option value = "NBA">NBA</option>
        <option value = "ATP">ATP</option>
      </select>
    </div>
  );
}
export default App;
