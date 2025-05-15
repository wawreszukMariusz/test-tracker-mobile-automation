const { $, driver } = require("@wdio/globals");
const BasePage = require("./BasePage");

class RegisterPage extends BasePage {
  get mainBannerLogo() {
    return $('//*[@resource-id="main_banner_logo"]');
  }

  get mainBannerScreenName() {
    return $('//*[@resource-id="main_banner_text"]');
  }

  get emailInput() {
    return $('//*[@resource-id="email_input"]');
  }

  get passwordInput() {
    return $('//*[@resource-id="password_input"]');
  }

  get companyNameInput() {
    return $('//*[@resource-id="company_input"]');
  }

  get registerButton() {
    return $('//*[@resource-id="register_button"]');
  }

  get errorLabel() {
    return $('//*[@resource-id="error_label"]');
  }

  async screenDisplayed() {
    await this.mainBannerLogo.waitForDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.emailInput).toBeDisplayed();
    await expect(this.passwordInput).toBeDisplayed();
    await expect(this.companyNameInput).toBeDisplayed();
    await expect(this.registerButton).toBeDisplayed();
  }

  async register(email, password, companyName) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.companyNameInput.setValue(companyName);

    await this.registerButton.click();
  }
}

module.exports = new RegisterPage();
