import { SigninPage } from './signin.po';
import { Navbar } from '../components/navbar.po';
import { browser } from 'protractor';

describe('E2E Test of Signin Page', () => {
  let page: SigninPage;
  let navbar: Navbar;
  let user;

  beforeEach(() => {
    const width = 1024;
    const height = 1024;
    user = {
      email: 'test@test.com',
      password : 'test'
    };
    browser.driver.manage().window().setSize(width, height);
    page = new SigninPage();
    navbar = new Navbar();
  });

  it('should display one email field', () => {
    page.navigateTo();
    const field = page.getEmailField();
    expect(field.isDisplayed()).toBeTruthy();
  });

  it('should display one password field', () => {
    page.navigateTo();
    const field = page.getPasswordfield();
    expect(field.isDisplayed()).toBeTruthy();
  });

  it('should display one login button', () => {
    page.navigateTo();
    expect(page.getSigninButton().isDisplayed()).toBeTruthy();
  });

  it('login should fail', () => {
    page.navigateTo();
    page.getEmailField().sendKeys('test@test.com');
    page.getPasswordfield().sendKeys('false');
    page.getSigninButton().click();

    navbar.waitForVisibleProfile();

    expect(navbar.getProfilNameElement().isDisplayed()).toBe(true);
    expect(navbar.getProfilNameElement().getText()).toBe('');
    expect(page.getErrorField().getText()).toBe('Something went wrong, please try again.');
  });

  it('should display user name in navbar', () => {
    page.navigateTo();
    page.signin(user);
    navbar.waitForVisibleProfile();
    expect(navbar.getProfilNameElement().isDisplayed()).toBe(true);
    expect(navbar.getProfilNameElement().getText()).toBe('test');
    navbar.getLoggoutButton().click();
  });

  it('should display Logout Button in Navbar', () => {
    page.navigateTo();
    page.signin(user);
    navbar.waitForVisibleLogoutButton();
    expect(navbar.getLoggoutButton().isDisplayed()).toBe(true);
    navbar.getLoggoutButton().click();
  });



});


function makeName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < 5; index++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
}

