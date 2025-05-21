const HomePage = require("../pageobjects/HomePage");
const LoginPage = require("../pageobjects/LoginPage");
const RegisterPage = require("../pageobjects/RegisterPage");
const ProjectPage = require("../pageobjects/ProjectPage");
const CustomCommands = require("../utils/CustomCommands");
const AddProjectPage = require("../pageobjects/AddProjectPage");
const GalleryPage = require("../pageobjects/GalleryPage");

describe("Project sequence", () => {
  before(async () => {
    await CustomCommands.pushImageToEmulator("project_logo.png");
  });

  beforeEach(async () => {
    const email = (await CustomCommands.generateEmail()).toString();
    const password = "test123";

    await LoginPage.screenDisplayed();
    await LoginPage.registerButton.click();

    await RegisterPage.screenDisplayed();
    await RegisterPage.register(email, password, "TestTracker");

    await LoginPage.screenDisplayed();
    await LoginPage.login(email, password);

    await HomePage.screenDisplayed();
    await HomePage.singleOption("Projects").click();

    await ProjectPage.screenDisplayedEmptyState();
  });

  afterEach(async () => {
    await CustomCommands.reinstallApp();
  });

  it("add project with proper data", async () => {
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("Test");
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
    await expect(ProjectPage.projectName[0]).toHaveText("Test");
  });

  it("update project with proper data", async () => {
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("Test Updated");
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
    await expect(ProjectPage.projectName[0]).toHaveText("Test Updated");
  });

  it("update project without providing name", async () => {
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("Test");
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
    await expect(ProjectPage.projectName[0]).toHaveText("Test");

    await ProjectPage.projectEditButton[0].click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
    await expect(ProjectPage.projectName[0]).toHaveText("Test");
  });

  it("add project with image", async () => {
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("Test");

    await AddProjectPage.pickImageButton.click();
    await GalleryPage.chooseFirstPhoto();

    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
    await expect(ProjectPage.projectName[0]).toHaveText("Test");
  });

  it("adding project without name should result with error", async () => {
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.addProjectButton.click();
    await AddProjectPage.screenDisplayed();
  });
});
