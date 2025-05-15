const { $, driver } = require("@wdio/globals");
const path = require("path");
const { browser } = require("@wdio/globals");

class CustomCommands {
  async generateEmail() {
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
}

module.exports = new CustomCommands();
