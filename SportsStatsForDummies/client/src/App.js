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
  const [search, setSearch] = useState("");
  const [playerResults, setPlayerResults] = useState([]);
  useEffect(() =>{
    async function searchPlayers(){
      // doesn't search unless you type a letter in
      if(search.trim() === ""){
        setPlayerResults([]);
        return;
      }
      try{
        const response = await fetch(`http://localhost:8080/nba-player-search/${encodeURIComponent(search)}`);
        if(!response.ok){
          throw new Error("Could not search players");
        }
        const data = await response.json();
        setPlayerResults(data);
      } catch(error){
        console.error(error);
      }
    }
    searchPlayers();
  }, [search]);
  return(
    <>
      <input
      type="text"
      placeholder="Search Teams, Players, and Stats"
      className="searchBar"
      value = {search}
      onChange={(event) => setSearch(event.target.value)}
      />
      {playerResults.length>0 && (
        <div className="searchResults">
          {playerResults.slice(0,6).map((player) => (
            <div className="searchResultPlayer" key={player.id}>
              {player.full_name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
function NBALeaderboardBox() {
  const [selectedLeague, setSelectedLeague] = useState("NBA");

  const [leaderboardData, setLeaderboardData] = useState({
    NBA: [],
    ATP: []
  });

  useEffect(() => {
    async function getNBALeaderboard() {
      try {
        const response = await fetch(
          "http://localhost:8080/nba-leaderboard"
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Could not retrieve NBA leaderboard");
        }
        setLeaderboardData({
          NBA: data,
          ATP: []
        });
      } catch (error) {
        console.error(error);
      }
    }
    getNBALeaderboard();
  }, []);
  const westernConference = leaderboardData.NBA
    .filter((team) => team.conference === "West")
    .sort((a, b) => a.rank - b.rank);
  const easternConference = leaderboardData.NBA
    .filter((team) => team.conference === "East")
    .sort((a, b) => a.rank - b.rank);
  console.log("West:", westernConference);
  console.log("East:", easternConference);
  return (
    <div className="body-sportLeaderboard">
      <div className="body-conference">
        <h3 className="body-conferenceTitle">
          WESTERN CONFERENCE
        </h3>
        {westernConference.map((team) => (
          <div className="body-leaderboardTeam" key={team.team_id}>
            <div className="body-leaderboardRank">
              {team.rank}
            </div>
            <div className="body-leaderboardName">
              {team.team_city} {team.team_name}
            </div>
            <div className="body-leaderboardRecord">
              {team.record}
            </div>
          </div>
        ))}
      </div>
      <div className="body-conference">
        <h3 className="body-conferenceTitle">
          EASTERN CONFERENCE
        </h3>
        {easternConference.map((team) => (
          <div className="body-leaderboardTeam" key={team.team_id}>
            <div className="body-leaderboardRank">
              {team.rank}
            </div>
            <div className="body-leaderboardName">
              {team.team_city} {team.team_name}
            </div>
            <div className="body-leaderboardRecord">
              {team.record}
            </div>
          </div>
        ))}
      </div>
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
