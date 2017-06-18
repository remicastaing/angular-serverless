import { browser, element, by, ExpectedConditions } from 'protractor';

export class Navbar {

  waitForVisibleLogoutButton(){
    browser.wait(ExpectedConditions.presenceOf(this.getLoggoutButton()), 2000);
  }
  
  getLoggoutButton() {
    return element(by.linkText('Logout'));
  }

  getProfilNameElement() {
    return element(by.tagName('profile'));
  }

  waitForVisibleProfile(){
    browser.wait(ExpectedConditions.presenceOf(this.getProfilNameElement()), 2000);
  }


}
