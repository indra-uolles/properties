import { fakeGetProperties } from './FakeServer';

const create = () => {

  const getProperties = async(variables) => {
    return fakeGetProperties(variables);
  }

  return {
    getProperties
  };
};

export default create();