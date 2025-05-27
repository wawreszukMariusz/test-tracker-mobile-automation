const HomePage = require("../../pageobjects/HomePage");
const LoginPage = require("../../pageobjects/LoginPage");
const ProjectPage = require("../../pageobjects/ProjectPage");
const CustomCommands = require("../../utils/CustomCommands");
const ScenarioPage = require("../../pageobjects/ScenarioPage");
const AddScenarioPage = require("../../pageobjects/AddScenarioPage");
const ApiUtility = require("../../utils/ApiUtility");

describe("Scenario sequence", () => {
  beforeEach(async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const accessCode = (await CustomCommands.generateAccessCode()).toString();
    const password = "test123";

    await ApiUtility.register(email, password, "TestTracker", accessCode);
    await ApiUtility.addProject("Test Api", accessCode);

    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
    await HomePage.singleOption("Projects").click();

    await ProjectPage.screenDisplayed();
    await ProjectPage.projectBox[0].click();

    await ScenarioPage.screenDisplayedEmptyState();

    await ScenarioPage.addScenarioButton.click();
    await AddScenarioPage.screenDisplayed();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it("add scenario with proper data", async () => {
    await AddScenarioPage.input.setValue("Test");
    await AddScenarioPage.addScenarioButton.click();

    await ScenarioPage.screenDisplayed();
    await expect(ScenarioPage.scenarioName[0]).toHaveText("Test");
  });

  it("update scenario with proper data", async () => {
    await AddScenarioPage.input.setValue("Test Updated");
    await AddScenarioPage.addScenarioButton.click();

    await ScenarioPage.screenDisplayed();
    await expect(ScenarioPage.scenarioName[0]).toHaveText("Test Updated");
  });

  it("update scenario without providing name", async () => {
    await AddScenarioPage.input.setValue("Test");
    await AddScenarioPage.addScenarioButton.click();

    await ScenarioPage.screenDisplayed();
    await expect(ScenarioPage.scenarioName[0]).toHaveText("Test");

    await ScenarioPage.scenarioEditButton[0].click();

    await AddScenarioPage.screenDisplayed();
    await AddScenarioPage.addScenarioButton.click();

    await ScenarioPage.screenDisplayed();
    await expect(ScenarioPage.scenarioName[0]).toHaveText("Test");
  });

  it("adding scenario without name should result with error", async () => {
    await AddScenarioPage.screenDisplayed();
    await AddScenarioPage.addScenarioButton.click();
    await AddScenarioPage.screenDisplayed();
  });
});
