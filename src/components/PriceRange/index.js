import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = {
  1145800: '1 145 800',
  362900000: '362 900 000'
}

export default class PriceRange extends React.Component {
  state = {...this.props.formData};

  render() {
    const { min, max } = this.state;
    return (
      <React.Fragment>
        <div className='properties-form__price'>{min.toLocaleString('ru-RU')} — {max.toLocaleString('ru-RU')}</div>
        <Range 
          min={1145800} 
          max={362900000} 
          marks={marks} 
          defaultValue={[1145800, 362900000]} 
          onAfterChange={(e) => {
            this.setState({
              min: e[0],
              max: e[1]
            }, () => this.props.onChange(this.state));
          }}
        />
      </React.Fragment>
    );
  }
}