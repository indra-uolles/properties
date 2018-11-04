import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import New from './pages/New';
import MainMenu from './components/MainMenu';
import './bootstrap.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <header className='App-header'>
            <MainMenu />
          </header>
          <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/buy' component={Buy} />
            <Route exact path='/rent' component={Rent} />
            <Route exact path='/new' component={New} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
