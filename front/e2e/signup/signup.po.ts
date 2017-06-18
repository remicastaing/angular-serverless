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

  signup(user) {
    this.getNameField().sendKeys(user.name);
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.getConfirmPasswordfield().sendKeys(user.password);
    this.getSignupButton().click();
  }

}


