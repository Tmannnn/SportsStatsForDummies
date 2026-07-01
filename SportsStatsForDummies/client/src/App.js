import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. <br />
          Why wont it appear in aside more testing
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer" 
        >
          Learn React
        </a>
      </header>
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
      placeholder="  Search Teams, Players, and Stats"
      className="searchBar"
    />
  );
}
export default App;
