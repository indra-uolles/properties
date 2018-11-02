import React, {Component} from 'react';
import Properties from '../Properties';
import { originalSchema, originalUISchema, processForm } from '../../services/Forms';

const originalFormData = {
  property: 'new',
  priceRange: {
    min: 1145800,
    max: 362900000
  },
  rooms: [1]
};

const initialState = processForm(
  originalSchema, 
  originalUISchema, 
  originalSchema, 
  originalUISchema, 
  originalFormData
);

export default function New(props) {
  return <Properties initialState={initialState} intentType='new'/>;
}