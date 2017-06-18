import { HomePage } from './home.po';

fdescribe('E2E Test of Home Page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display more than one feature', () => {
    page.navigateTo();
    expect(page.getFeatureCards().count()).toBeGreaterThan(0);
  });
});