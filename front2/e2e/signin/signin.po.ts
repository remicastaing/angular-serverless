import { browser, element, by, ExpectedConditions } from 'protractor';

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
    return element(by.id('error-message'));
  }

  waitForErrorField(text) {
    browser.wait(ExpectedConditions.textToBePresentInElement(this.getErrorField(), text), 2000);
  }

  signin(user) {
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.getSigninButton().click();
  }

}


