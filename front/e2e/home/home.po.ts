import { browser, element, by, ExpectedConditions } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getFeatureCards() {
    return element.all(by.css('.card'));
  }

  waitForHome() {
    browser.wait(ExpectedConditions.urlContains('home'), 2000);
  }

  getProfilNameElement() {
    return element(by.tagName('profile'));
  }

  waitForVisibleProfile() {
    browser.wait(ExpectedConditions.presenceOf(this.getProfilNameElement()), 2000);
  }


}
