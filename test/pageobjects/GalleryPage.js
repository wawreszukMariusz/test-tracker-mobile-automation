const { $, expect } = require("@wdio/globals");
const BasePage = require("./BasePage");

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
