import { HomePage } from '../home/home.po';
import { SignupPage } from '../signup/signup.po';
import { SigninPage } from '../signin/signin.po';
import { SettingsPage } from './settings.po';
import { Navbar } from '../components/navbar.po';
import { browser } from 'protractor';

describe('E2E Test of Settings Page', () => {
    let settings: SettingsPage;
    let signup: SignupPage;
    let signin: SigninPage;
    let home: HomePage;
    let navbar: Navbar;
    let name: string;
    let user;



    beforeAll(() => {
        const width = 1024;
        const height = 1024;
        browser.driver.manage().window().setSize(width, height);
        settings = new SettingsPage();
        signup = new SignupPage();
        signin = new SigninPage();
        home = new HomePage();
        navbar = new Navbar();

        signup.navigateTo();
        name = makeName();
        user = {
            name: name,
            email: name + '@test.com',
            password: name
        };
        signup.signup(user);
        navbar.waitForVisibleProfile();
        navbar.getLoggoutButton().click();

    });


    beforeEach(() => {
        const width = 1024;
        const height = 1024;
        browser.driver.manage().window().setSize(width, height);
        settings = new SettingsPage();
        signup = new SignupPage();
        signin = new SigninPage();
        navbar = new Navbar();
        home.navigateTo();
    });

    it('should display one current password field', () => {
        signin.navigateTo();
        signin.signin(user);
        navbar.waitForVisibleProfile();
        settings.navigateTo();
        navbar.waitForVisibleProfile();
        const field = settings.getCurrentPasswordField();
        expect(field.isDisplayed()).toBeTruthy();
    });

    it('should display one sign up button', () => {
        signin.navigateTo();
        signin.signin(user);
        navbar.waitForVisibleProfile();
        settings.navigateTo();
        navbar.waitForVisibleProfile();
        expect(settings.getSaveButton().isDisplayed()).toBeTruthy();
    });

    it('should change password', () => {
        signin.navigateTo();
        signin.signin(user);
        navbar.waitForVisibleProfile();
        settings.navigateTo();
        settings.changePasword({
            current: name,
            new: 'newpassword'
        });

        settings.waitForSuccessMessage();
        expect(settings.getSuccessMessage().getText()).toBe('Your password has been succesfully updated.');
        navbar.getLoggoutButton().click();
    });

    it('login with old pasword should fail', () => {

        signin.navigateTo();
        signin.signin({
            email: name + '@test.com',
            password: name
        });

        navbar.waitForVisibleProfile();

        expect(navbar.getProfilNameElement().isDisplayed()).toBe(true);
        expect(navbar.getProfilNameElement().getText()).toBe('');
        expect(signin.getErrorField().getText()).toBe('Something went wrong, please try again.');
    });

    it('login with new pasword should success', () => {

        signin.navigateTo();
        signin.signin({
            email: name + '@test.com',
            password: 'newpassword'
        });
        navbar.waitForVisibleProfile();
        expect(navbar.getProfilNameElement().isDisplayed()).toBe(true);
        expect(navbar.getProfilNameElement().getText()).toBe(name);
        navbar.getLoggoutButton().click();
    });



});


function makeName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let index = 0; index < 5; index++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

