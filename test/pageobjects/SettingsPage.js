const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class SettingsPage extends BasePage {
  get accessCodeInput() {
    return $('//*[@resource-id="accesscode_input"]');
  }

  get passwordInput() {
    return $('//*[@resource-id="password_input"]');
  }

  get setAccessCodeButton() {
    return $('//android.widget.TextView[@text="Set access code"]../');
  }

  get changeAccessCodePasswordButton() {
    return $(
      '//android.widget.TextView[@text="Change access code password"]../'
    );
  }

  get deleteAccountButton() {
    return $('//android.widget.TextView[@text="Delete account"]../');
  }

  get logoutButton() {
    return $('//android.widget.TextView[@text="Logout"]../');
  }

  get permissionsUserEmail() {
    return $$('//*[@resource-id="user_email"]');
  }

  get permissionsChooserButton() {
    return $$('//*[@resource-id="permission_chooser_box"]');
  }

  get setPermissionsButton() {
    return $('//android.widget.TextView[@text="Set permissions"]../');
  }

  async screenDisplayed() {
    await this.accessCodeInput.waitForDisplayed();
    await expect(this.passwordInput).waitForDisplayed();
    await expect(this.setAccessCodeButton).waitForDisplayed();
    await expect(this.changeAccessCodePasswordButton).waitForDisplayed();
    await expect(this.deleteAccountButton).waitForDisplayed();
    await expect(this.logoutButton).waitForDisplayed();
  }
}

module.exports = new SettingsPage();
