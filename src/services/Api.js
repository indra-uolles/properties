import { fakeGetProperties } from './FakeServer';

class Api {
  async getProperties(variables) {
    return fakeGetProperties(variables);
  }
}

export default new Api();