import logo from './logo.svg';
import './App.css';
import InterestForm from './InterestForm'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Headnote">Built With React</p>
        <InterestForm/>
      </header>
      <div>
        <body>
        </body>
      </div>
    </div>
  );
}

export default App;