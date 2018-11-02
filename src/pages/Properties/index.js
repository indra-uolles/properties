import React, {Component} from 'react';
import Form from 'react-jsonschema-form';
import api from '../../services/Api';
import { originalSchema, originalUISchema, processForm, fields } from '../../services/Forms';
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

  componentDidMount() {
    const {intentType} = this.props;
    const variables = { type: intentType};
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
