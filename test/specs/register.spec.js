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

  it("positive path", async () => {
    await RegisterPage.register(
      (await CustomCommands.generateEmail()).toString(),
      "test123",
      "test"
    );

    await LoginPage.screenDisplayed();
  });

  it("should show errors when invalid values are provided", async () => {
    await RegisterPage.emailInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
    await RegisterPage.emailInput.clearValue();

    await RegisterPage.passwordInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });

  it("button shouldn't be active when data is empty", async () => {
    await RegisterPage.emailInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
    await RegisterPage.emailInput.clearValue();

    await RegisterPage.passwordInput.setValue("test");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });

  it("should reject email without @ symbol", async () => {
    await RegisterPage.emailInput.setValue("invalid.email.com");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });

  it("should reject email without domain", async () => {
    await RegisterPage.emailInput.setValue("user@");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });

  it("should reject password shorter than 6 characters", async () => {
    await RegisterPage.passwordInput.setValue("123");
    await expect(RegisterPage.errorLabel).toBeDisplayed();
  });

  it("should not allow registering with an already used email", async () => {
    const email = await CustomCommands.generateEmail();

    await RegisterPage.register(email, "test123", "test");
    await LoginPage.screenDisplayed();

    await CustomCommands.reinstallApp();
    await LoginPage.screenDisplayed();

    await LoginPage.registerButton.click();

    await RegisterPage.register(email, "test123", "test");
    await RegisterPage.screenDisplayed();
  });
});
