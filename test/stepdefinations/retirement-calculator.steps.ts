import { Given, When, Then } from "@wdio/cucumber-framework";
import retirementCalculatorPage from "../pageobjects/retirement-calculator.page";
import resultsPage from "../pageobjects/results.page";

Given(/^the user is on the Retirement Savings Calculator form page$/, async () => {
    await retirementCalculatorPage.open(
        "https://www.securian.com/insights-tools/retirement-calculator.html"
    );
    await retirementCalculatorPage.acceptCookies();
});

When(/^the user fill in "([^"]*)" fields with valid data$/, async (form_data) => {
    await retirementCalculatorPage.fillRetirementPlanDetails(form_data);
});


When(/^clicks the "Calculate" button$/, async () => {
    await retirementCalculatorPage.submitRetirementPlan();
});

Then(/^the user should see a success message$/, async () => {
    await resultsPage.calculatorResultsSection.waitForDisplayed({timeout: 10000,});
    await expect(resultsPage.calculatorResultsSection).toBeDisplayed();
    await expect(resultsPage.resultMessage).toBeDisplayed();
});

When(
    /^selects the Social Security benefits "([^"]*)" with "([^"]*)" fields and maried status "([^"]*)"$/,
    async (benefits_toggle: string, form_data: string, marital_status: string) => {
        await retirementCalculatorPage.fillSocialSecurityBenefitDetails(
            benefits_toggle,
            form_data,
            marital_status
        );
    }
);

When(
    /^the user selects the Social Security benefits toggle as "([^"]*)"$/,
    async (benefits_toggle: string) => {
        await retirementCalculatorPage.selectSocialBenefits(benefits_toggle);
    }
);

Then(
    /^the additional Social Security fields should be "([^"]*)" on the form$/,
    async (visibility: string) => {

        if (visibility == "visible") {
            await expect(retirementCalculatorPage.maritalStatusNo).toBeDisplayed();
            await expect(retirementCalculatorPage.maritalStatusYes).toBeDisplayed();
            await expect(retirementCalculatorPage.socialSecurityOverride).toBeDisplayed();
        } else {
            await expect(await retirementCalculatorPage.maritalStatusNo.isDisplayed()).toBe(false);
            await expect(await retirementCalculatorPage.maritalStatusYes.isDisplayed()).toBe(false);
            await expect(await retirementCalculatorPage.socialSecurityOverride.isDisplayed()).toBe(false);
        }

    }
);

When(/^updates default calculator values$/, async () => {
    await retirementCalculatorPage.clickAdjustDefaultValues();
    await retirementCalculatorPage.addAdjustDefaultValues("No");
    await retirementCalculatorPage.saveDefaultValues();
});

When(/^the user clicks the "Calculate" button without required fields filled$/, async () => {
    await retirementCalculatorPage.submitRetirementPlan();
});

Then(/^the user should see an error message for required fields$/, async () => {
    await expect(retirementCalculatorPage.calculatorInputAlert).toBeDisplayed();
});