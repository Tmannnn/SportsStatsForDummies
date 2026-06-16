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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. <br />
          Why wont it appear in aside more testing
        </p>
        <Button />
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
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
function Button(){
  return(
    <button>I'm a button </button>
  );
}
export default App;
