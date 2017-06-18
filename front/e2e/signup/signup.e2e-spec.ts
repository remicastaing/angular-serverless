import { SignupPage } from './signup.po';
import { Navbar } from '../components/navbar.po';
import { browser } from 'protractor';

describe('E2E Test of Signup Page', () => {
  let page: SignupPage;
  let navbar: Navbar;

  beforeEach(() => {
    const width = 1024;
    const height = 1024;
    browser.driver.manage().window().setSize(width, height);
    page = new SignupPage();
    navbar = new Navbar();
  });

  it('should display one login field', () => {
    page.navigateTo();
    const field = page.getNameField();
    expect(field.isDisplayed()).toBeTruthy();
  });

  it('should display one sign up button', () => {
    page.navigateTo();
    expect(page.getSignupButton().isDisplayed()).toBeTruthy();
  });

  it('should create user', () => {
    page.navigateTo();
    const name = makeName();
    const user = {
      name : name,
      email : name + '@test.com',
      password : name
    };
    page.signup(user);

    navbar.waitForVisibleProfile();
    expect(navbar.getProfilNameElement().isDisplayed()).toBe(true);
    expect(navbar.getProfilNameElement().getText()).toBe(user.name);
  });

});


function makeName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < 5; index++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

