const { $, driver } = require("@wdio/globals");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  get emailInput() {
    return $('//*[@resource-id="email_input"]');
  }

  get passwordInput() {
    return $('//*[@resource-id="password_input"]');
  }

  get loginButton() {
    return $('//*[@resource-id="login_button"]');
  }

  get registerButton() {
    return $('//*[@resource-id="register_label"]');
  }

  get errorLabel() {
    return $('//*[@resource-id="error_label"]');
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await expect(this.emailInput).toBeDisplayed();
    await expect(this.passwordInput).toBeDisplayed();
    await expect(this.loginButton).toBeDisplayed();
    await expect(this.registerButton).toBeDisplayed();
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);

    await this.loginButton.click();
  }
}

module.exports = new LoginPage();
