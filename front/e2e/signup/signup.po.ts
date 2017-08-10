import { browser, element, by } from 'protractor';

export class SignupPage {
  navigateTo() {
    return browser.get('/signup');
  }

  getNameField() {
    return element(by.id('name'));
  }

  getEmailField() {
    return element(by.id('email'));
  }

  getPasswordfield() {
    return element(by.id('password'));
  }

  getConfirmPasswordfield() {
    return element(by.id('confirm'));
  }

  getSignupButton() {
    return element(by.buttonText('Sign up'));
  }

  getErrorField() {
    return element(by.css('.form-group.has-danger')).$('.form-control-feedback');
  }

  getFBButton() {
    return element(by.css('.btn.btn-outline-primary.btn-social.btn-facebook'));
  }

  signup(user) {
    this.getNameField().sendKeys(user.name);
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.getConfirmPasswordfield().sendKeys(user.password);
    this.getSignupButton().click();
  }

}


