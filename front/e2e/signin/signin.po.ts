import { browser, element, by } from 'protractor';

export class SigninPage {
  navigateTo() {
    return browser.get('/signin');
  }

  getEmailField() {
    return element(by.id('email'));
  }

  getPasswordfield() {
    return element(by.id('password'));
  }

  getSigninButton() {
    return element(by.buttonText('Login'));
  }

  getErrorField() {
    return element(by.css('.form-group.has-danger')).$('.form-control-feedback');
  }

  signin(user) {
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.getSigninButton().click();
  }



}


