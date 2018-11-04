import React, { Component } from 'react';
import Properties from '../Properties';
import { originalSchema, originalUISchema } from '../../services/FormSchema';
import { processForm } from '../../services/FormUtils';

const originalFormData = {
  property: 'buy',
  priceRange: {
    min: 100000,
    max: 10000000
  },
  rooms: [2,3]
};

const initialState = processForm(
  originalSchema, 
  originalUISchema, 
  originalSchema, 
  originalUISchema, 
  originalFormData
);

export default function Buy(props) {
  return <Properties initialState={initialState} intentType='buy'/>;
}