const BasePage = require("../pageobjects/BasePage");
const LoginPage = require("../pageobjects/LoginPage");
const RegisterPage = require("../pageobjects/RegisterPage");
const CustomCommands = require("../utils/CustomCommands");

describe("Register sequence", () => {
  beforeEach(async () => {
    await LoginPage.screenDisplayed();
    await LoginPage.registerButton.click();

    await RegisterPage.screenDisplayed();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it("Positive path", async () => {
    await RegisterPage.register(
      (await CustomCommands.generateEmail()).toString(),
      "test123",
      "test"
    );

    await LoginPage.screenDisplayed();
  });

  it("Validation - invalid values", async () => {
    await RegisterPage.emailInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
    await RegisterPage.emailInput.clearValue();

    await RegisterPage.passwordInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });
});
