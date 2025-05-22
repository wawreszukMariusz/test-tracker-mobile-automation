const HomePage = require("../pageobjects/HomePage");
const LoginPage = require("../pageobjects/LoginPage");
const RegisterPage = require("../pageobjects/RegisterPage");
const ProjectPage = require("../pageobjects/ProjectPage");
const CustomCommands = require("../utils/CustomCommands");
const AddProjectPage = require("../pageobjects/AddProjectPage");
const ScenarioPage = require("../pageobjects/ScenarioPage");
const AddScenarioPage = require("../pageobjects/AddScenarioPage");
const TestCasePage = require("../pageobjects/TestCasePage");
const AddTestCasePage = require("../pageobjects/AddTestCasePage");
const ApiUtility = require("../utils/ApiUtility");

describe("Test case sequence", () => {
  beforeEach(async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const accessCode = (await CustomCommands.generateAccessCode()).toString();
    const password = "test123";

    await ApiUtility.register(email, password, "TestTracker", accessCode);
    const projectId = await ApiUtility.addProject("Test", accessCode);
    await ApiUtility.addScenario("Test", projectId, accessCode);

    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
    await HomePage.singleOption("Projects").click();

    await ProjectPage.screenDisplayed();
    await ProjectPage.projectBox[0].click();

    await ScenarioPage.screenDisplayed();
    await ScenarioPage.scenarioBox[0].click();

    await TestCasePage.screenDisplayedEmptyState();
    await TestCasePage.addTestCaseButton.click();

    await AddTestCasePage.screenDisplayed();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it.only("add test case with proper data", async () => {
    await AddTestCasePage.input.setValue("Test");
    await AddTestCasePage.addTestCaseButton.click();

    await TestCasePage.screenDisplayed();
    await expect(TestCasePage.testCaseName[0]).toHaveText("Test");
  });

  it("update test case with proper data", async () => {
    await AddTestCasePage.input.setValue("Test Updated");
    await AddTestCasePage.addTestCaseButton.click();

    await TestCasePage.screenDisplayed();
    await expect(TestCasePage.testCaseName[0]).toHaveText("Test Updated");
  });

  it("update test case without providing name", async () => {
    await AddTestCasePage.input.setValue("Test");
    await AddTestCasePage.addTestCaseButton.click();

    await TestCasePage.screenDisplayed();
    await expect(TestCasePage.testCaseName[0]).toHaveText("Test");

    await TestCasePage.testCaseEditButton[0].click();

    await AddTestCasePage.screenDisplayed();
    await AddTestCasePage.addTestCaseButton.click();

    await TestCasePage.screenDisplayed();
    await expect(TestCasePage.testCaseName[0]).toHaveText("Test");
  });

  it("adding test case without name should result with error", async () => {
    await AddTestCasePage.screenDisplayed();
    await AddTestCasePage.addTestCaseButton.click();
    await AddTestCasePage.screenDisplayed();
  });
});
