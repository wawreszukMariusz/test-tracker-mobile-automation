const { expect } = require("@wdio/globals");
const HomePage = require("../pageobjects/HomePage");
const { HomeScreenOptions } = require("../utils/data");
const ProjectPage = require("../pageobjects/ProjectPage");
const AddProjectPage = require("../pageobjects/AddProjectPage");

describe("Add Project sequence - ", () => {
  beforeEach(async () => {
    await HomePage.screenDisplayed();
    await HomePage.singleOption(HomeScreenOptions.PROJECTS).click();
  });

  it("Add project without image", async () => {
    await ProjectPage.screenDisplayedEmptyState();
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("TestTracker");
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
  });

  it("Add project with image", async () => {
    await ProjectPage.screenDisplayedEmptyState();
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.input.setValue("TestTracker");
    await AddProjectPage.addProjectButton.click();

    await ProjectPage.screenDisplayed();
  });

  it("Validation - no project name provided", async () => {
    await ProjectPage.screenDisplayedEmptyState();
    await ProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
    await AddProjectPage.addProjectButton.click();

    await AddProjectPage.screenDisplayed();
  });
});
