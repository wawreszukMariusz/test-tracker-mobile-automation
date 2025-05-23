const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class ExecutionPage extends BasePage {
  get noResultsFoundTitle() {
    return $('//*[@resource-id="no_results_found_text"]');
  }

  get noResultsFoundSubtitle() {
    return $('//*[@resource-id="check_connection_text"]');
  }

  get timer() {
    return $('//*[@resource-id="timer"]');
  }

  get scenarioBox() {
    return $$('//*[@resource-id="scenario_box"]');
  }

  get scenarioId() {
    return $$('//*[@resource-id="scenario_id"]');
  }

  get scenarioName() {
    return $$('//*[@resource-id="scenario_name"]');
  }

  get testCaseBox() {
    return $$('//*[@resource-id="testcase_box"]');
  }

  get testCaseId() {
    return $$('//*[@resource-id="testcase_id"]');
  }

  get testCaseName() {
    return $$('//*[@resource-id="testcase_name"]');
  }

  get testStepBox() {
    return $$('//*[@resource-id="teststep_box"]');
  }

  get testStepId() {
    return $$('//*[@resource-id="teststep_id"]');
  }

  get testStepExpected() {
    return $$('//*[@resource-id="teststep_expected"]');
  }

  get testStepResult() {
    return $$('//*[@resource-id="teststep_result"]');
  }

  get testStepPassButton() {
    return $$('//*[@resource-id="pass_button"]');
  }

  get testStepFailButton() {
    return $$('//*[@resource-id="fail_button"]');
  }

  get endExecutionButton() {
    return $('//*[@resource-id="end_execution_button"]');
  }

  async scenarioBoxDisplayed(index) {
    await this.scenarioBox[index].waitForDisplayed();
    await expect(this.scenarioName[index]).toBeDisplayed();
    await expect(this.scenarioId[index]).toBeDisplayed();
  }

  async testCaseBoxDisplayed(index) {
    await this.testCaseBox[index].waitForDisplayed();
    await expect(this.testCaseName[index]).toBeDisplayed();
    await expect(this.testCaseId[index]).toBeDisplayed();
  }

  async testStepBoxDisplayed(index) {
    await this.testStepBox[index].waitForDisplayed();
    await expect(this.testStepId[index]).toBeDisplayed();
    await expect(this.testStepExpected[index]).toBeDisplayed();
    await expect(this.testStepResult[index]).toBeDisplayed();
    await expect(this.testStepPassButton[index]).toBeDisplayed();
    await expect(this.testStepFailButton[index]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await expect(this.timer).toBeDisplayed();
    await this.scenarioBoxDisplayed(0);
    await this.testCaseBoxDisplayed(0);
    await this.testStepBoxDisplayed(0);
  }
}

module.exports = new ExecutionPage();
