import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home/index';
import Buy from './pages/Buy/index';
import Rent from './pages/Rent/index';
import New from './pages/New/index';
import './bootstrap.css';
import './App.css';

const MainMenu = () => (
  <div className='main-menu'>
    <Link to='/'>
      <button>Главная</button>
    </Link>
    <Link to='/buy'>
      <button>Купить</button>
    </Link>
    <Link to='/rent'>
      <button>Снять</button>
    </Link>
    <Link to='/new'>
      <button>Новостройки</button>
    </Link>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <header className='App-header'>
            <div>Недвижимость</div>
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
