import { fakeGetProperties } from './FakeServer';

const create = () => {

  const getProperties = async(variables) => {
    return fakeGetProperties(variables.type);
  }

  return {
    getProperties
  };
};

export default create();