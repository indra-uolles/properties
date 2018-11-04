import PriceRange from '../components/PriceRange';
import Rooms from '../components/Rooms';

export const fields = { priceRange: PriceRange, rooms: Rooms };

export const originalSchema = {
  title: '',
  type: 'object',
  properties: {
    property: {
      type: 'string',
      title: 'Что вы хотите?',
      enum: ['buy', 'rent', 'new'],
      enumNames: ['Продажа', 'Аренда', 'Новостройка']
    },
    rooms: {
      type: 'array',
      items: {
        type: 'number',
        enum: [0, 1, 2, 3, 4, 5, 6],
        enumNames: ['Студия', '1-комнатная квартира', '2-комнатная квартира', '3-комнатная квартира', '4-комнатная квартира', '5-комнатная квартира', '6-комнатная квартира']
      }
    },
    priceRange: {
      type: 'object',
      required: ['min', 'max'],
      properties: {
        min: { type: 'number' },
        max: { type: 'number' }
      }
    },
    mortgage: {
      type: 'boolean',
      title: 'Ипотека'
    },
    instalments: {
      type: 'boolean',
      title: 'Рассрочка'
    }
  }
};

export const originalUISchema = {
  'ui:order': ['property', 'rooms', 'priceRange', 'mortgage', 'instalments'],
  rooms: {
    'ui:field': 'rooms',
    classNames: 'col-md-6 col-sm-12'
  },
  priceRange: {
    'ui:field': 'priceRange',
    classNames: 'col-md-6 col-sm-12 properties-form__price-range'
  },
  property: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true
    },
    classNames: 'hidden-form-field'
  },
  mortgage: {
    condition: 'property=buy||property=new',
    classNames: 'col-md-2 mortgage App-clearfix'
  },
  instalments: {
    condition: 'property=buy||property=new',
    classNames: 'col-md-2 instalments'
  },
};