const { $, expect } = require("@wdio/globals");
const BasePage = require("./BasePage");

export const HomeScreenOptions = {
  PROJECTS: "Projects",
  REPORTS: "Reports",
  TEST_EXECUTE: "Test Execute",
  SETTINGS: "Settings",
};

class HomePage extends BasePage {
  get welcomeBannerPhoto() {
    return $('//*[@resource-id="welcome_banner_photo"]');
  }

  get welcomeBannerTitle() {
    return $('//*[@resource-id="welcome_banner_title"]');
  }

  get welcomeBannerSubtite() {
    return $('//*[@resource-id="welcome_banner_desc"]');
  }

  singleOption(optionName) {
    return $(`//*[@resource-id="option_box_title" and @text="${optionName}"]`);
  }

  async welcomeBannerDisplayed() {
    await this.welcomeBannerPhoto.waitForDisplayed();
    await expect(this.welcomeBannerTitle).toBeDisplayed();
    await expect(this.welcomeBannerSubtite).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await this.welcomeBannerDisplayed();

    await expect(this.singleOption(HomeScreenOptions.PROJECTS)).toBeDisplayed();
    await expect(this.singleOption(HomeScreenOptions.REPORTS)).toBeDisplayed();
    await expect(
      this.singleOption(HomeScreenOptions.TEST_EXECUTE)
    ).toBeDisplayed();
    await expect(this.singleOption(HomeScreenOptions.SETTINGS)).toBeDisplayed();
  }
}

module.exports = new HomePage();
