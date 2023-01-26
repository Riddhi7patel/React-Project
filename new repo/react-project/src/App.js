import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React New Project</h1>
        <p>
           React is so cool!
        </p>
        <p>
        I love React!
        </p>
        <ul>
        <li>Easy to use</li>
        <li>Usefull app</li>
        <li>Faster app</li>
        </ul>
       
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

export default App;
