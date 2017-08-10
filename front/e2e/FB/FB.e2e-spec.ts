import { SignupPage } from '../signup//signup.po';
import { Navbar } from '../components/navbar.po';
import { browser } from 'protractor';
import { FBTestUsers } from './fb-test-users';
import { FacebookPage } from './facebook.po';


import { SECRETS } from '../../secrets';



fdescribe('E2E Test of Signup Page', () => {
  let page: SignupPage;
  let fbpage: FacebookPage;
  let navbar: Navbar;
  let user: any;

  beforeAll((done) => {
    const fbTestUsers = new FBTestUsers(SECRETS.FACEBOOK_ID, SECRETS.FACEBOOK_SECRET);

    fbTestUsers.fetchAccessToken((err, res) => {
      fbTestUsers.create({}, (error, result) => {
        user = result;
        console.log(user);
        fbTestUsers.getUserInfo(user, (err, res) => {
          user.name = res.name;
          done();
        });
        // done();
      });
    });
  });

  beforeEach(() => {
    const width = 1024;
    const height = 1024;
    browser.driver.manage().window().setSize(width, height);
    page = new SignupPage();
    navbar = new Navbar();
  });

  afterAll((done) => {
    const fbTestUsers = new FBTestUsers(SECRETS.FACEBOOK_ID, SECRETS.FACEBOOK_SECRET);

    fbTestUsers.delete(user.id, (err, res) => {
      done();
    });
  });

  it('should display one facebook button', () => {
    page.navigateTo();
    const button = page.getFBButton();
    expect<any>(button.isDisplayed()).toBeTruthy();
  });

  it('should signup with fb test user account', function() {
            page.getFBButton().click().then(function() {
                fbpage = new FacebookPage;

                fbpage.waitForFacebookPage();

                fbpage.enterEmail(user.email);
                fbpage.enterPassword(user.password);
                fbpage.clickLoginButton().then(function() {
                  fbpage.clickConfirmButton().then(() => {
                    navbar = new Navbar();
                    navbar.waitForVisibleProfile();
                    expect<any>(navbar.getProfilNameElement().isDisplayed()).toBe(true);
                    expect<any>(navbar.getProfilNameElement().getText()).toBe(user.name);
                  });

                });

            });
        });



});


