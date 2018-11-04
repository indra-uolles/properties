import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import Promise from 'bluebird';
import api from '../../services/Api';
import { originalSchema, originalUISchema, fields } from '../../services/FormSchema';
import { processForm } from '../../services/FormUtils';
import ApartmentsListItem from '../../components/ApartmentsListItem';
import './style.css';

export default class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.initialState,
      properties: []
    }
  }

  fetchProperties = (variables) => {
    this.getPropertiesPromise = Promise.resolve(api.getProperties(variables))
      .catch(console.error.bind(console, 'Failed to load properties'))
      .then((data) =>{
        this.setState({
          properties: data
        });
      });
  }

  componentDidMount() {
    const { intentType } = this.props;
    const variables = { property: intentType };

    this.fetchProperties(variables);
  }

  componentWillUnmount() {
    !!this.getPropertiesPromise && this.getPropertiesPromise.cancel();
  }

  handleChange (data) {
    const schema = { ...this.state.schema };
    const uiSchema = { ...this.state.uiSchema };
    const { formData } = data;

    const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);

    this.setState(newState);
  }

  onSubmit = ({formData}) => {
    this.fetchProperties({...formData});
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
        >
          <button type='submit' className='btn btn-info properties-form__submit'>Подобрать</button>
        </Form>
      </div>
        <div className='properties'>
          {properties.map((property) => (
            <ApartmentsListItem {...property} key={property.id}/>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
