const { browser } = require("@wdio/globals");
const path = require("path");

class BasePage {
  get mainBannerLogo() {
    return $('//*[@resource-id="main_banner_logo"]');
  }

  get mainBannerScreenName() {
    return $('//*[@resource-id="main_banner_text"]');
  }

  generateEmail() {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);

    return `tester${timestamp}@test.com`;
  }

  async reinstallApp() {
    const appPackage = "com.mw.testapp";
    const appPath =
      process.env.APP_PATH || path.join(process.cwd(), "app", "app.apk");

    await driver.removeApp(appPackage);
    await driver.installApp(appPath);
    await driver.activateApp(appPackage);
  }

  async mainBannerDisplayed() {
    await this.mainBannerLogo.waitForDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
  }
}

module.exports = BasePage;
