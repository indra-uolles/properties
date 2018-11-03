import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './style.css';

export default class PriceRange extends React.Component {
  state = {
    ...this.props.formData, 
    minStart: this.props.formData.min, 
    maxStart: this.props.formData.max
  };

  render() {
    const { min, max, minStart, maxStart } = this.state;
    const marks = {
      [minStart]: minStart.toLocaleString('ru-RU'),
      [maxStart]: maxStart.toLocaleString('ru-RU')
    };
    return (
      <div className='price-range-wrap'>
        <div className='price-range'>
          <div className='properties-form__price'>{min.toLocaleString('ru-RU')} — {max.toLocaleString('ru-RU')}</div>
          <Range 
            min={minStart} 
            max={maxStart} 
            defaultValue={[minStart, maxStart]} 
            onAfterChange={(e) => {
              this.setState({
                min: e[0],
                max: e[1]
              }, () => this.props.onChange(this.state));
            }}
            marks={marks}
          />
        </div>      
      </div>
    );
  }
}