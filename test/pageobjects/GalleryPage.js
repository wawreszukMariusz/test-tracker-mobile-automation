const { $, expect } = require("@wdio/globals");
const BasePage = require("./BasePage");

export const HomeScreenOptions = {
  PROJECTS: "Projects",
  REPORTS: "Reports",
  TEST_EXECUTE: "Test Execute",
  SETTINGS: "Settings",
};

class GalleryPage extends BasePage {
  get singlePhoto() {
    return $(
      '(//android.view.View[starts-with(@content-desc, "Photo taken on")])[1]'
    );
  }

  async chooseFirstPhoto() {
    await this.singlePhoto.waitForDisplayed();
    await this.singlePhoto.click();
  }
}

module.exports = new GalleryPage();
