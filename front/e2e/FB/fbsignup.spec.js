'use strict';

var config = browser.params;
var SignupPage = require('./signup.po');
var FacebookPage = require('./facebook.po');
var Navbar = require('../../components/navbar/navbar.po');

describe('Signup View', function() {
    var signupPage;
    var navbar;
    var facebook;

    var testUser = {
        name: 'Rémi Castaing',
        email: 'remi_bjmhutc_castaing@tfbnw.net',
        password: 'azerty33127'
    };

    beforeEach(function() {
        signupPage = new SignupPage();

    });

    describe('with facebook auth', function() {

        it('should have a facebook signup button', function() {
            expect(signupPage.facebookButton.isDisplayed()).toBe(true);
        });

        it('should have a facebook signup button', function() {
            signupPage.facebookButton.click().then(function() {
                facebook = new FacebookPage;

                facebook.enterEmail(testUser.email);
                facebook.enterPassword(testUser.password);
                facebook.clickLoginButton().then(function() {
                    browser.ignoreSynchronization = false;
                    navbar = new Navbar();

                    expect(navbar.navbarAccountGreeting.getText()).toBe('Bonjour '+testUser.name);
                });

            });
        });

    });
});
