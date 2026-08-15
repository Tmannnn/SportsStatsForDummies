import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from "react";

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
        <NBALeaderboardBox />
        <Games />
        <PointsLeaderboard />
        <ReboundsLeaderboard />
        <AssistsLeaderboard />
        <HeadtoHead />
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
function NBALeaderboardBox(){
  // add a button on the botton or dropdown that switches between conferences and maybe the divisions
  const [selectedLeague, setSelectedLeague] = useState("NBA");
  const [leaderboardData, sestLeaderboardData] = useState({
    NBA: [],
    ATP: []
  });
  useEffect(() => {
    async function getNBALeaderboard(){
      try{
        const response = await fetch("http://localhost:8080"); // change this to the corect link when I actually launch it
        const data = await response.json();
        sestLeaderboardData({
          NBA: data,
          ATP:[]
        });
      } catch(error){
        console.error(error);
      }
    }
    getNBALeaderboard();
  }, []);
  return(
    <div className = "body-sportLeaderboard">
      <select value = {selectedLeague} onChange={(e)=>setSelectedLeague(e.target.value)} className = "body-sportLeaderboardButton" style={{ width: `${selectedLeague.length + 4}ch` }}>
        <option value = "NBA">NBA</option>
        <option value = "ATP">ATP</option>
      </select>
      {leaderboardData[selectedLeague].map((item) => (
          <p key={item.rank}>
            {item.rank}. {item.name}
          </p>
        ))}
    </div>
  );
}
function Games() {
  const [selectedLeague, setSelectedLeague] = useState("NBA");
  const [gameData, setGameData] = useState({
    NBA: [],
    ATP: []
  });
  useEffect(() => {
    async function getNBAGames() {
      try {
        const response = await fetch("http://localhost:8080/nba-odds");
        if (!response.ok) {
          throw new Error("Could not retrieve NBA games");
        }
        const data = await response.json();
        console.log(data);
        console.log(data.length);
        setGameData({
          NBA: data,
          ATP: []
        });
      } catch (error) {
        console.error(error);
      }
    }
    getNBAGames();
  }, []);
  return (
    <div className="body-games">
      {/* not sure if I want this since ill have a nba page and a atp page*/}
      {/*
      <select
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
        className="body-gamesButton"
        style={{ width: `${selectedLeague.length + 4}ch` }}
      >
        <option value="NBA">NBA</option>
        <option value="ATP">ATP</option>
      </select>
      */}
      {gameData[selectedLeague].map((game) => (
        <div className="body-gamesTeam" key={game.id}>
          <div className="body-gamesMatchup">
            {game.away_team} vs. {game.home_team}
          </div>

          <div className="body-gamesTime">
          {new Date(game.commence_time).toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
          })}
          </div>
        </div>
      ))}
    </div>
  );
}
function PointsLeaderboard(){
  return(
    <div className = "body-PointsLeaderboard">
      Points Leaderboard
    </div>
  );
}
function ReboundsLeaderboard(){
  return(
    <div className = "body-ReboundsLeaderboard">
      Rebounds Leaderboard
    </div>
  );
}
function AssistsLeaderboard(){
  return(
    <div className = "body-AssistsLeaderboard">
      Assists Leaderboard
    </div>
  );
}function HeadtoHead(){
  return(
    <div className = "body-HeadtoHead">
      Head to Heads
    </div>
    // add a button or dropdown menu that allows you to switch between steals and defense and maybe more defensive stats
  );
}
export default App;
