import { browser, element, by, ExpectedConditions } from 'protractor';

export class SettingsPage {
  navigateTo() {
    return browser.get('/settings');
  }

  getCurrentPasswordField() {
    return element(by.id('currentpassword'));
  }

  getPasswordfield() {
    return element(by.id('password'));
  }

  getConfirmPasswordfield() {
    return element(by.id('confirm'));
  }

  getSaveButton() {
    return element(by.buttonText('Save changes'));
  }

  getSuccessMessage() {
    return element(by.className('alert-success'));
  }

  waitForSuccessMessage() {
    browser.wait(ExpectedConditions.presenceOf(this.getSuccessMessage()), 2000);
  }

  changePasword(password) {
    this.getCurrentPasswordField().sendKeys(password.current);
    this.getPasswordfield().sendKeys(password.new);
    this.getConfirmPasswordfield().sendKeys(password.new);
    this.getSaveButton().click();
  }


}


