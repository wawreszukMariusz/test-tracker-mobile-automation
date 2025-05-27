const HomePage = require("../../pageobjects/HomePage");
const LoginPage = require("../../pageobjects/LoginPage");
const RegisterPage = require("../../pageobjects/RegisterPage");
const CustomCommands = require("../../utils/CustomCommands");

describe("Login sequence", () => {
  beforeEach(async () => {
    await LoginPage.screenDisplayed();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it("positive path", async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const password = "test123";

    await LoginPage.registerButton.click();

    await RegisterPage.screenDisplayed();
    await RegisterPage.register(email, password, "TestTracker");

    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
  });

  it("should show errors when invalid values are provided", async () => {
    await LoginPage.emailInput.setValue("test");
    await expect(LoginPage.errorLabel).toBeDisplayed();
    await LoginPage.emailInput.clearValue();

    await LoginPage.passwordInput.setValue("test");
    await expect(LoginPage.errorLabel).toBeDisplayed();
  });
});
