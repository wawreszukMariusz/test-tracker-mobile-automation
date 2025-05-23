const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class AddProjectPage extends BasePage {
  get inputTitle() {
    return $('//*[@resource-id="input_title"]');
  }

  get input() {
    return $('//*[@resource-id="input"]');
  }

  get photoPreview() {
    return $('//*[@resource-id="photo_preview"]');
  }

  get pickImageButton() {
    return $('//*[@resource-id="custom_small_button"]');
  }

  get addProjectButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await this.photoPreview.waitForDisplayed();
    await expect(this.inputTitle).toBeDisplayed();
    await expect(this.input).toBeDisplayed();
    await expect(this.addProjectButton).toBeDisplayed();
  }
}

module.exports = new AddProjectPage();
