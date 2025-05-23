const HomePage = require("../pageobjects/HomePage");
const LoginPage = require("../pageobjects/LoginPage");
const ProjectPage = require("../pageobjects/ProjectPage");
const CustomCommands = require("../utils/CustomCommands");
const StartExecutionPage = require("../pageobjects/StartExecutionPage");
const ExecutionPage = require("../pageobjects/ExecutionPage");
const ApiUtility = require("../utils/ApiUtility");
const SingleReportPage = require("../pageobjects/SingleReportPage");

describe("Test execution sequence", () => {
  beforeEach(async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const accessCode = (await CustomCommands.generateAccessCode()).toString();
    const password = "test123";

    await ApiUtility.register(email, password, "TestTracker", accessCode);
    await ApiUtility.prepareCompleteData(1, accessCode);
    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
    await HomePage.singleOption("Test Execute").click();

    await ProjectPage.screenDisplayed(true);
    await ProjectPage.projectBox[0].click();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it("execution should result with report generation", async () => {
    await StartExecutionPage.screenDisplayed();
    await StartExecutionPage.executionNameInput.setValue("Test Exectution");
    await StartExecutionPage.scenarioCheckBox[0].click();
    await StartExecutionPage.startExecutionButton.click();

    await ExecutionPage.screenDisplayed();
    await ExecutionPage.testStepPassButton[0].click();
    await ExecutionPage.endExecutionButton.click();

    await SingleReportPage.screenDisplayed();
  });

  it("not providing execution name should be blocked by validation", async () => {
    await StartExecutionPage.screenDisplayed();
    await StartExecutionPage.scenarioCheckBox[0].click();
    await StartExecutionPage.startExecutionButton.click();

    await StartExecutionPage.screenDisplayed();
  });

  it("starting execution without scenarios checked should be blocked by validation", async () => {
    await StartExecutionPage.screenDisplayed();
    await StartExecutionPage.executionNameInput.setValue("Test Execution");
    await StartExecutionPage.startExecutionButton.click();

    await StartExecutionPage.screenDisplayed();
  });
});
