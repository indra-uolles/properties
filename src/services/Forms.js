import { 
  isEmpty, 
  pickBy, 
  assign, 
  each, 
  isArray, 
  indexOf, 
  every, 
  some, 
  omit, 
  intersection, 
  keys 
} from 'lodash';
import PriceRange from '../components/PriceRange/index';
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

/**
 * Calculate new state for form based on UI Schema field conditions and current form data
 *
 * @param originalSchema - Original full schema containing all possible fields
 * @param originalUISchema - Original full UI Schema containing all possible fields
 * @param schema - Current schema
 * @param uiSchema - Current UI schema
 * @param formData - Current form data
 * @return {object} - Object containing new schema, uiSchema, and formData
 */
export function processForm (originalSchema, originalUISchema, schema, uiSchema, formData) {
  let newSchema, newUISchema, newFormData;
  let conditionalFields = pickBy(uiSchema, (field) => field.hasOwnProperty('condition'));

  if (isEmpty(conditionalFields)) {
    return {
      schema,
      uiSchema,
      formData
    };
  }

  newSchema = assign({}, schema);
  newUISchema = assign({}, uiSchema);
  newFormData = assign({}, formData);

  each(conditionalFields, (dependantSchema, dependant) => {
    const { rules, allHaveToMatch } = getConditionRules(dependantSchema.condition);
    let matches = [];
    each(rules, (rule) => {
      const { field, values: stringValues, invert } = getConditionRule(rule);
      let visible = invert;

      const values = stringValues.map(value => {
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        return value;
      });

      if (field && newFormData.hasOwnProperty(field)) {
          let currentValues = isArray(newFormData[field])
            ? newFormData[field]
            : [ newFormData[field] ];
          each(values, (value) => {
            if (invert) {
              visible = visible && indexOf(currentValues, value) === -1;
            }
            else {
              visible = visible || indexOf(currentValues, value) !== -1;
            }
          });
      }

      matches.push(visible);
    });

    // Add or remove conditional field from schema
    let shouldBeVisible = false;
    if (matches.length) {
      shouldBeVisible = allHaveToMatch
      // foo=bar && bar=foo
      ? every(matches, Boolean)
      // foo=bar || bar=foo
      : some(matches, Boolean);
    }

    if (shouldBeVisible) {
      newSchema.properties[dependant] = originalSchema.properties[dependant];
    } else {
      newSchema.properties = omit(newSchema.properties, [dependant]);
      newFormData = omit(newFormData, [dependant]);
    }
  });

  // Update UI Schema UI order
  // react-jsonschema-form cannot handle extra properties found in UI order
  newUISchema['ui:order'] = intersection(
    originalUISchema['ui:order'],
    keys(newSchema.properties)
  );
  // Update Schema required fields
  if (originalSchema.hasOwnProperty('required')) {
    newSchema.required = intersection(
      originalSchema.required,
      keys(newSchema.properties)
    );
  }

  return {
    schema: newSchema,
    uiSchema: newUISchema,
    formData: newFormData
  };
}

function getConditionRules (condition = '') {
  let rules = [];
  let allHaveToMatch = false;
  let visible = false;

  // foo=bar || bar=foo
  if (condition.indexOf('||') !== -1) {
    rules = condition.split('||');
    allHaveToMatch = false;
    visible = false;
  }
  // foo=bar && bar=foo
  else if (condition.indexOf('&&') !== -1) {
    rules = condition.split('&&');
    allHaveToMatch = true;
    visible = true;
  }
  // foo=bar
  else {
    rules = [condition];
    allHaveToMatch = true;
    visible = true;
  }

  return {
    rules,
    allHaveToMatch,
    visible
  };
}

function getConditionRule (conditionRule) {
  let rule = []
  let invert;

  // foo!=bar
  if (conditionRule.indexOf('!=') !== -1) {
    rule = conditionRule.split('!=');
    invert = true;
  }
  // foo=bar
  else if (conditionRule.indexOf('=') !== -1) {
    rule = conditionRule.split('=');
    invert = false;
  }

  if (rule.length !== 2) {
    return false;
  }

  let [field, values] = rule;

  values = values.split(',');

  return {
    field,
    values,
    invert
  };
}