import { browser, element, by, ExpectedConditions } from 'protractor';

export class Navbar {

  waitForVisibleLogoutButton() {
    browser.wait(ExpectedConditions.presenceOf(this.getLoggoutButton()), 2000);
  }

  getLoggoutButton() {
    return element(by.linkText('Logout'));
  }

  getSettingsButton() {
    return element(by.linkText('Settings'));
  }

  getProfilNameElement() {
    return element(by.tagName('app-navbar-profile'));
  }

  waitForVisibleProfile() {
    browser.wait(ExpectedConditions.presenceOf(this.getProfilNameElement()), 5000);
  }

  waitForVisibleSettings() {
    browser.wait(ExpectedConditions.presenceOf(this.getSettingsButton()), 2000);
  }

}
