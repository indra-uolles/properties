import React, { Component } from 'react';
import Properties from '../Properties';
import { originalSchema, originalUISchema } from '../../services/FormSchema';
import { processForm } from '../../services/FormUtils';

const originalFormData = {
  property: 'new',
  priceRange: {
    min: 100000,
    max: 10000000
  },
  rooms: [1,2]
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