import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import './bootstrap.css';
import './App.css';

const MainMenu = () => (
  <div>
    <Link to="/">
      <button>Главная</button>
    </Link>
    <Link to="/about">
      <button>О нас</button>
    </Link>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div>Недвижимость</div>
            <MainMenu />
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
