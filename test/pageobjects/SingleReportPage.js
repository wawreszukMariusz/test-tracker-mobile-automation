const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class SingleReportPage extends BasePage {
  get passedTestsAmount() {
    return $('//*[@resource-id="passed_tests"]');
  }

  get failedTestsAmount() {
    return $('//*[@resource-id="failed_tests"]');
  }

  get chart() {
    return $('//*[@resource-id="chart"]');
  }

  get scenarioName() {
    return $$('//*[@resource-id="scenario_name"]');
  }

  get testCaseName() {
    return $$('//*[@resource-id="test_case_name"]');
  }

  get expectedText() {
    return $$('//*[@resource-id="expected_text"]');
  }

  get executionName() {
    return $('//*[@resource-id="execution__name"]');
  }

  get projectName() {
    return $('//*[@resource-id="execution_project"]');
  }

  get executionTime() {
    return $('//*[@resource-id="execution_time"]');
  }

  get exectuionDate() {
    return $('//*[@resource-id="execution_date"]');
  }

  get downloadReportButton() {
    return $('//*[@resource-id="custom_small_button"][1]');
  }

  get shareReportButton() {
    return $('//*[@resource-id="custom_small_button"][2]');
  }

  async screenDisplayed() {
    await this.chart.waitForDisplayed();
    await expect(this.passedTestsAmount).toBeDisplayed();
    await expect(this.failedTestsAmount).toBeDisplayed();

    await expect(this.scenarioName[0]).toBeDisplayed();
    await expect(this.testCaseName[0]).toBeDisplayed();
    await expect(this.expectedText[0]).toBeDisplayed();

    await expect(this.executionName).toBeDisplayed();
    await expect(this.executionTime).toBeDisplayed();
    await expect(this.projectName).toBeDisplayed();
    await expect(this.exectuionDate).toBeDisplayed();

    await expect(this.downloadReportButton).toBeDisplayed();
    await expect(this.shareReportButton).toBeDisplayed();
  }
}

module.exports = new SingleReportPage();
