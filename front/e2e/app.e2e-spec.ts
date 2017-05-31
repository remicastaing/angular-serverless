import { AngularServerlessPage } from './app.po';

describe('angular-serverless App', () => {
  let page: AngularServerlessPage;

  beforeEach(() => {
    page = new AngularServerlessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
