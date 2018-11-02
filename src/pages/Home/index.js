import React, {Component} from 'react';
import Form from 'react-jsonschema-form';
import api from '../../services/Api';
import { originalSchema, processForm } from '../../services/Forms';
import PriceRange from '../../components/PriceRange/index';
import Rooms from '../../components/Rooms';
import './style.css';
import ApartmentsListItem from '../../components/ApartmentsListItem';

const originalUISchema = {
  'ui:order': ['property', 'rooms', 'priceRange', 'mortgage', 'instalments'],
  rooms: {
    'ui:field': 'rooms',
    classNames: 'col-xs-6'
  },
  priceRange: {
    'ui:field': 'priceRange',
    classNames: 'col-xs-6'
  },
  property: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true
    },
    classNames: 'col-xs-12'
  },
  mortgage: {
    condition: 'property=buy||property=new',
    classNames: 'col-xs-3 App-clearfix'
  },
  instalments: {
    condition: 'property=buy||property=new',
    classNames: 'col-xs-3'
  },
};
const originalFormData = {
  property: 'buy',
  priceRange: {
    min: 1145800,
    max: 362900000
  },
  rooms: [1]
};
const fields = {priceRange: PriceRange, rooms: Rooms};
const initialState = processForm(
  originalSchema, 
  originalUISchema, 
  originalSchema, 
  originalUISchema, 
  originalFormData
);

export default class Home extends Component {
  state = {...initialState, properties: []};

  componentDidMount() {
    const variables = { type: 'buy'};
    api.getProperties(variables).then((data) =>{
      this.setState({
        properties: data
      });
    });
  }

  handleChange (data) {
    const schema = { ...this.state.schema };
    const uiSchema = { ...this.state.uiSchema };
    const { formData } = data;

    const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);

    this.setState(newState);
  }

  onSubmit = ({formData}) => {
    alert(JSON.stringify(formData));
  }

  render() {
    const { properties } = this.state;
    return (
      <React.Fragment>
      <div className='properties-form'>
        <Form
          schema={this.state.schema}
          uiSchema={this.state.uiSchema}
          fields={fields}
          formData={this.state.formData}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.onSubmit}
        />
      </div>
        <div className='properties'>
          {properties.map((property) => (
            <ApartmentsListItem {...property}/>
          ))}
        </div>
      </React.Fragment>
    );
  }
}