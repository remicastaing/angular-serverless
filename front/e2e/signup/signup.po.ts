import { browser, element, by, ExpectedConditions } from 'protractor';

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
    return element(by.id('error-message'));
  }

  waitForErrorField(text) {
    browser.wait(ExpectedConditions.textToBePresentInElement(this.getErrorField(), text), 2000);
  }

  getFBButton() {
    return element(by.partialButtonText('Facebook'));
  }

  signup(user) {
    this.getNameField().sendKeys(user.name);
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.getConfirmPasswordfield().sendKeys(user.password);
    this.getSignupButton().click();
  }

}


