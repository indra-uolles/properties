import React, { Component } from 'react';
import Properties from '../Properties';
import { originalSchema, originalUISchema } from '../../services/FormSchema';
import { processForm } from '../../services/FormUtils';

const originalFormData = {
  property: 'rent',
  priceRange: {
    min: 5000,
    max: 90000
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

export default function Rent(props) {
  return <Properties initialState={initialState} intentType='rent'/>;
}