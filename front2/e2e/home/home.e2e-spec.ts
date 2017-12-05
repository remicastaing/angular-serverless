import { HomePage } from './home.po';

describe('E2E Test of Home Page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display more than one feature', () => {
    page.navigateTo();
    page.waitForFeatureCards();
    expect<any>(page.getFeatureCards().count()).toBeGreaterThan(0);
  });
});
