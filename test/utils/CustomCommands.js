const { $, driver } = require("@wdio/globals");
const path = require("path");
const fs = require("fs");

class CustomCommands {
  async generateEmail() {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);

    return `tester${timestamp}@test.com`;
  }

  async generateAccessCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      code += chars[idx];
    }
    return code;
  }

  async reinstallApp() {
    const appPackage = "com.mw.testapp";
    const appPath =
      process.env.APP_PATH || path.join(process.cwd(), "app", "app.apk");

    await driver.removeApp(appPackage);
    await driver.installApp(appPath);
    await driver.activateApp(appPackage);
  }

  async pushImageToEmulator(assetFilename, targetPath = "/sdcard/Download") {
    const fullPath = path.resolve(__dirname, "../assets", assetFilename);
    const base64 = fs.readFileSync(fullPath, { encoding: "base64" });

    await driver.pushFile(`${targetPath}/${assetFilename}`, base64);
  }
}

module.exports = new CustomCommands();
