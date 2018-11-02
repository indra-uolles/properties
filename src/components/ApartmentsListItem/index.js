import React, { Component } from 'react';
import './style.css';

export default class ApartmentsListItem extends React.Component {
  getRooms = (rooms) => {
    if (rooms == 0) {
      return 'Студия'
    } else {
      return `${rooms}-комнатная квартира`
    }
  }

  render() {
    const { area, rooms, price, address, material, floor } = this.props;
    return (
      <article className='apartments-list-item'>
        <div className='apartments-list-item__image-wrap'>
          <img className='apartments-list-item__image' src='//media.ongrad.ru/api/images/2kk_61_90.jpg'/>
        </div>
        <div className='apartments-list-item__content'>
          <h2>
            <a className='apartments-list-item__name' href='#' target='_blank'>
              {this.getRooms(rooms)}, {area} м<sup>2</sup>
            </a>
          </h2>
          <p className='apartments-list-item__address'>{address}</p>
          <div className='apartments-list-item__price'>{price.toLocaleString('ru-RU')} руб.</div>
          <ul className='apartments-list-item__details'>
            <li className='apartments-list-item__details-option'>
              <span>Дом: {material}</span>
            </li>
            <li className='apartments-list-item__details-option'>
              <span>Этаж: {floor}</span>
            </li>
          </ul>
        </div>
      </article>
    );
  }
}