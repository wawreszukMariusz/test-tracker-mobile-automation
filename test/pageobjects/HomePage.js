const { $, expect } = require("@wdio/globals");
const BasePage = require("./BasePage");
const { HomeScreenOptions } = require("../utils/data");

class HomePage extends BasePage {
  get mainBannerLogo() {
    return $('//android.view.View[@resource-id="main_banner_logo"]');
  }

  get welcomeBannerPhoto() {
    return $('//android.view.View[@resource-id="welcome_banner_photo"]');
  }

  get welcomeBannerTitle() {
    return $('//android.widget.TextView[@resource-id="welcome_banner_title"]');
  }

  get welcomeBannerSubtite() {
    return $('//android.widget.TextView[@resource-id="welcome_banner_desc"]');
  }

  singleOption(optionName) {
    return $(
      `//android.widget.TextView[@resource-id="option_box_title" and @text="${optionName}"]`
    );
  }

  async screenDisplayed() {
    await this.mainBannerLogo.waitForDisplayed();
    await this.welcomeBannerPhoto.waitForDisplayed();
    await expect(this.welcomeBannerTitle).toBeDisplayed();
    await expect(this.welcomeBannerSubtite).toBeDisplayed();
    await expect(this.singleOption(HomeScreenOptions.PROJECTS)).toBeDisplayed();
    await expect(this.singleOption(HomeScreenOptions.REPORTS)).toBeDisplayed();
    await expect(this.singleOption(HomeScreenOptions.SETTINGS)).toBeDisplayed();
    await expect(
      this.singleOption(HomeScreenOptions.TEST_EXECUTE)
    ).toBeDisplayed();
  }
}

module.exports = new HomePage();
