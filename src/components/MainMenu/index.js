import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const MainMenuItems = [
  { url: '', text: 'Главная' },
  { url: 'buy', text: 'Купить' },
  { url: 'rent', text: 'Снять' },
  { url: 'new', text: 'Новостройки' },
];

const MenuItem = ({ item }) => {
  return (
    <NavLink exact to={`/${item.url}`} activeClassName='active'>
      {item.text}
    </NavLink>
  );
};

export default function MainMenu() {
  return (
    <nav>
      <ul className='main-menu'>
        {MainMenuItems.map((item, index) => (
          <li className='main-menu__item' key={index}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}