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