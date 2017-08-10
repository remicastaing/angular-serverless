'use strict';

import { browser, element, by, ExpectedConditions } from 'protractor';

export class FacebookPage {
  constructor() {
    browser.ignoreSynchronization = true;
  }

  getEmailField() {
    return element(by.id('email'));
  }

  getPasswordfield() {
    return element(by.id('pass'));
  }

  enterEmail(keys) {
    return this.getEmailField().sendKeys(keys);
  }

  enterPassword(keys) {
    return this.getPasswordfield().sendKeys(keys);
  }

  getLoginButton() {
    return element(by.id('loginbutton'));
  }

  clickLoginButton() {
    return this.getLoginButton().click();
  }

  waitForFacebookPage() {
    browser.wait(ExpectedConditions.presenceOf(this.getLoginButton()), 2000);
  }

  getConfirmButton() {
    return element(by.name('__CONFIRM__'));
  }

  waitForConfirmButton() {
    browser.wait(ExpectedConditions.presenceOf(this.getConfirmButton()), 2000);
  }

  waitForConfirmButtonClickable() {
    browser.wait(ExpectedConditions.elementToBeClickable(this.getConfirmButton()), 5000);
  }

  clickConfirmButton() {
    return this.getConfirmButton().click();
  }

  signin(user) {
    this.getEmailField().sendKeys(user.email);
    this.getPasswordfield().sendKeys(user.password);
    this.clickLoginButton();
  }

}
