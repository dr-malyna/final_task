class LoginPage {

    get username() {
        return $("//input[@data-test='username']");
    }

    get password() {
        return $("//input[@data-test='password']");
    }

    get loginBtn() {
        return $("//input[@data-test='login-button']");
    }

    get logoutBtn() {
        return $("//a[@data-test='logout-sidebar-link']");
    }

    get sideMenu() {
        return $("//div[@class='bm-menu-wrap']");
    }

    get menuBtn() {
        return $("//button[@id='react-burger-menu-btn']");
    }

    get error() {
        return $("//h3[@data-test='error']");
    }

    get inventoryContainer() {
        return $("//div[@id='inventory_container']");
    }

    get acceptedBlock() {
        return $("//div[@data-test='login-credentials']");
    }

    async acceptedUsers() {
        const raw = await this.acceptedBlock.getText();
        return raw
            .split('\n')
            .map(s => s.trim().replace(/^"|"$/g, ''))
            .filter(s => s && !s.toLowerCase().includes('accepted usernames are'));
    }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async login(user, pass) {
        await this.username.setValue(user);
        await this.password.setValue(pass);
    }

    async logout() {
        await this.menuBtn.click();
        await this.sideMenu.waitForDisplayed({ timeout: 5000 });
        await this.logoutBtn.waitForDisplayed({ timeout: 5000 });
        await this.logoutBtn.click();
    }

    async submit() {
        await this.loginBtn.click();
    }

    async clearUsername() {
        await this.username.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Backspace');
    };

    async clearPassword() {
        await this.password.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Backspace');
    };

    async getErrorText() {
        return this.error.getText();
    }
}

module.exports = new LoginPage();