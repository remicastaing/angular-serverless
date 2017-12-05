import { HomePage } from '../home/home.po';
import { SignupPage } from '../signup/signup.po';
import { SigninPage } from '../signin/signin.po';
import { SettingsPage } from './settings.po';
import { Navbar } from '../components/navbar.po';
import { browser, protractor } from 'protractor';


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
        navbar.waitForVisibleSettings();
        navbar.getSettingsButton().click();
        const field = settings.getCurrentPasswordField();
        expect<any>(field.isDisplayed()).toBeTruthy();
    });

    it('should display one sign up button', () => {
        signin.navigateTo();
        signin.signin(user);
        navbar.waitForVisibleSettings();
        navbar.getSettingsButton().click();
        navbar.waitForVisibleProfile();
        expect<any>(settings.getSaveButton().isDisplayed()).toBeTruthy();
    });

    it('should change password', () => {
        signin.navigateTo();
        signin.signin(user);
        navbar.waitForVisibleSettings();
        navbar.getSettingsButton().click();
        settings.changePasword({
            current: name,
            new: 'newpassword'
        });

        settings.waitForSuccessMessage();
        expect<any>(settings.getSuccessMessage().getText()).toBe('Your password has been succesfully updated.');
        navbar.getLoggoutButton().click();
    });

    it('login with old pasword should fail', () => {
        signin.navigateTo();
        signin.signin({
            email: name + '@test.com',
            password: name
        });
        signin.waitForErrorField('Something went wrong, please try again.');
        expect<any>(signin.getErrorField().getText()).toBe('Something went wrong, please try again.');
    });

    it('login with new pasword should success', () => {

        signin.navigateTo();
        signin.signin({
            email: name + '@test.com',
            password: 'newpassword'
        });
        navbar.waitForVisibleProfile();
        expect<any>(navbar.getProfilNameElement().isDisplayed()).toBe(true);
        expect<any>(navbar.getProfilNameElement().getText()).toBe(name);
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

