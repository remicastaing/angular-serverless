import { browser, element, by, ExpectedConditions } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getFeatureCards() {
    return element.all(by.css('div[id^=card]'));
  }

  getFirstFeatureCard() {
    return element(by.repeater('thing in awesomeThings').row(1));
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

  waitForFeatureCards() {
    browser.wait(this.waitForElements(this.getFeatureCards()), 2000);
  }

  waitForElements(elementArrayFinder) {
    return function () {
      return elementArrayFinder.count().then(function (actualCount) {
        return actualCount > 0;  // or <= instead of ===, depending on the use case
      });
    };
  }
}
