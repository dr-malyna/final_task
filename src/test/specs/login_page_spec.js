const { expect, browser, $ } = require('@wdio/globals');
const { accepted, negative } = require('../data/users'); // data provider
const LoginPage = require('../pageobjects/login_page');
const TEST_PASSWORD = 'secret_sauce';

describe('Swag Labs login', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('Check page title', async () => {
        await expect(browser).toHaveTitle('Swag Labs');
    });

    it('UC-1: Check credentials when empty', async () => {
        await LoginPage.login('any_user', 'any_password');
        await LoginPage.clearUsername();
        await LoginPage.clearPassword();
        await LoginPage.submit();
        await expect(LoginPage.error).toBeDisplayed();
        const message = await LoginPage.getErrorText();
        expect(message).toContain('Username is required');
    });

    it('UC-2: Password is required', async () => {
        await LoginPage.login('any_user', 'any_password');
        await LoginPage.clearPassword();
        await LoginPage.submit();
        await expect(LoginPage.error).toBeDisplayed();
        const message = await LoginPage.getErrorText();
        expect(message).toContain('Password is required');
    });

    it('UC-3: Valid logins', async () => {
        // const users = await LoginPage.acceptedUsers(); // dynamic data extraction
        for (const user of accepted) {
            console.log(`Testing with user: ${user}`);
            await LoginPage.login(user, TEST_PASSWORD);
            await LoginPage.submit();
            await browser.pause(300); // Wait for page to load

            await expect(browser).toHaveTitle('Swag Labs');
            await expect(LoginPage.inventoryContainer).toBeDisplayed();

            // Logout mechanism
            await LoginPage.logout();
            await expect(LoginPage.loginBtn).toBeDisplayed();

        }

        for (const user of negative) {
            console.log(`Testing with user: ${user}`);
            await LoginPage.login(user, TEST_PASSWORD);
            await LoginPage.submit();
            await browser.pause(300); // 0.3s

            await expect(LoginPage.error).toBeDisplayed();
            const message = await LoginPage.getErrorText();
            const ok =
                message.includes('user has been locked out') ||
                message.includes('Epic sadface: Username and password do not match any user in this service');
            console.log(`Error message: ${message}`);
            expect(ok).toBe(true);
            await LoginPage.clearUsername();
            await LoginPage.clearPassword();
        }
    });
});
