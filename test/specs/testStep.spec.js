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
const TestStepPage = require("../pageobjects/TestStepPage");
const AddTestStepPage = require("../pageobjects/AddTestStepPage");
const ApiUtility = require("../utils/ApiUtility");

describe("Test step sequence", () => {
  beforeEach(async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const accessCode = (await CustomCommands.generateAccessCode()).toString();
    const password = "test123";

    await ApiUtility.register(email, password, "TestTracker", accessCode);
    const projectId = await ApiUtility.addProject("Test", accessCode);
    const scenarioId = await ApiUtility.addScenario(
      "Test",
      projectId,
      accessCode
    );
    await ApiUtility.addTestCase("Test case", scenarioId);

    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
    await HomePage.singleOption("Projects").click();

    await ProjectPage.screenDisplayed();
    await ProjectPage.projectBox[0].click();

    await ScenarioPage.screenDisplayed();
    await ScenarioPage.scenarioBox[0].click();

    await TestCasePage.screenDisplayed();
    await TestCasePage.testCaseBox[0].click();

    await TestStepPage.screenDisplayedEmptyState();
    await TestStepPage.addTestStepButton.click();

    await AddTestStepPage.screenDisplayed();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it.only("add single test step with proper data", async () => {
    await AddTestStepPage.expectedInput[0].setValue("Text Expected");
    await AddTestStepPage.resultInput[0].setValue("Test Result");
    await AddTestStepPage.addTestStepButton.click();

    await TestStepPage.screenDisplayed();
    await expect(TestStepPage.expectedText[0]).toHaveText("Text Expected");
    await expect(TestStepPage.resultText[0]).toHaveText("Test Result");
  });

  it("update test step with proper data", async () => {
    await AddTestStepPage.expectedInput[0].setValue("Text Expected");
    await AddTestStepPage.resultInput[0].setValue("Test Result");
    await AddTestStepPage.addTestStepButton.click();

    await TestStepPage.screenDisplayed();
    await expect(TestStepPage.expectedText[0]).toHaveText("Text Expected");
    await expect(TestStepPage.resultText[0]).toHaveText("Test Result");

    await TestStepPage.testStepEditButton[0].click();

    await AddTestStepPage.screenDisplayed(true);
    await AddTestStepPage.expectedInput[0].setValue("Updated Text Expected");
    await AddTestStepPage.resultInput[0].setValue("Updated Test Result");
    await AddTestStepPage.addTestStepButton.click();

    await TestStepPage.screenDisplayed();
    await expect(TestStepPage.expectedText[0]).toHaveText(
      "Updated Text Expected"
    );
    await expect(TestStepPage.resultText[0]).toHaveText("Updated Test Result");
  });

  it("update test step without providing expected and result", async () => {
    await AddTestStepPage.expectedInput[0].setValue("Text Expected");
    await AddTestStepPage.resultInput[0].setValue("Test Result");
    await AddTestStepPage.addTestStepButton.click();

    await TestStepPage.screenDisplayed();
    await expect(TestStepPage.expectedText[0]).toHaveText("Text Expected");
    await expect(TestStepPage.resultText[0]).toHaveText("Test Result");

    await TestStepPage.testStepEditButton[0].click();
    await AddTestStepPage.screenDisplayed(true);
    await AddTestStepPage.addTestStepButton.click();

    await AddTestStepPage.screenDisplayed();
  });
});
