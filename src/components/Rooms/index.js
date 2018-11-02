import React, { Component } from 'react';
import {MultiSelect} from 'react-selectize';
import 'react-selectize/themes/index.css';

const options = [
  { label: 'Студия', value: 0 },
  { label: '1-комн.', value: 1 },
  { label: '2-комн.', value: 2 },
  { label: '3-комн.', value: 3 },
  { label: '4-комн.', value: 4 },
  { label: '5-комн.', value: 5 },
  { label: '6-комн.', value: 6 }
];

export default class Rooms extends React.Component {
  //если выбрать 1,2, то будет {"0"; 1, "1": 2}
  state = {...this.props.formData};

  handleChange = (selectedOptions) => {
    const newState = this.deriveStateFromSelectedOptions(selectedOptions);
    const newValues = Object.keys(newState).map((key) => newState[key]);
    
    this.setState(
      {...newState},
      this.props.onChange(newValues)
    );
  }

  deriveStateFromSelectedOptions = (selected) => {
    const values = selected.map((option) => option.value);
    let result = {};
    values.forEach((value, index) => {
      result[index.toString()] = value;
    });
    return result;
  }

  deriveOptionsFromState = () => {
    const values = Object.keys(this.state).map((key) => this.state[key]);
    return options.filter((option) => values.includes(option.value));
  }

  render() {
    return (
      <React.Fragment>
        <MultiSelect
          placeholder='К-во комнат'
          options={options.map(
            option => ({label: option.label, value: option.value})
          )}
          defaultValues={this.deriveOptionsFromState()}
          onValuesChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}