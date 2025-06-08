import Page from "./page.js";

class RetirmentCalculatorPage extends Page {
    get currentAge() {
        return $("#current-age");
    }
    get retirementAge() {
        return $("#retirement-age");
    }
    get currentIncome() {
        return $("#current-income");
    }
    get spouseIncome() {
        return $("#spouse-income");
    }
    get currentRetirementSavings() {
        return $("#current-total-savings");
    }
    get currentRetirementContribution() {
        return $("#current-annual-savings");
    }
    get savingsIncreaseRate() {
        return $("#savings-increase-rate");
    }
    get yesSocialBenefits() {
        return $('label[for="yes-social-benefits"]');
    }
    get noSocialBenefits() {
        return $('label[for="no-social-benefits"]');
    }

    get maritalStatusNo() {
        return $('label[for="single"]');
    }
    get maritalStatusYes() {
        return $('label[for="married"]');
    }
    get socialSecurityOverride() {
        return $("#social-security-override");
    }

    get calculateResults() {
        return $("button=Calculate");
    }
    get clearRetirementForm() {
        return $("button=Clear form");
    }
    get adjustdefaultValues() {
        return $("=Adjust default values");
    }

    get additionalIncome() {
        return $("#additional-income");
    }
    get retirementDuration() {
        return $("#retirement-duration");
    }
    get includeInflation() {
        return $('//label[@for="include-inflation"]');
    }
    get excludeInflation() {
        return $('//label[@for="exclude-inflation"]');
    }
    get expectedInflationRate() {
        return $("#expected-inflation-rate");
    }
    get retirementAnnualncome() {
        return $("#retirement-annual-income");
    }
    get preRetirementRoi() {
        return $("#pre-retirement-roi");
    }
    get postRetirementRoi() {
        return $("#post-retirement-roi");
    }
    get savePersonalizedValues() {
        return $("=Save changes");
    }
    get clearDefaultValuesForm() {
        return $("button=Cancel");
    }

    get calculatorInputAlert(){
        return $('#calculator-input-alert')
    }
    /**
     * Fill retirement plan details
     *  require - fill only required details
     *  all - fill all the fields
     * @param form_data
     */
    public async fillRetirementPlanDetails(form_data: string) {
        if (form_data == "required" || form_data == "all") {
            await this.currentAge.setValue("40");
            await this.retirementAge.setValue("68");
            await browser.clickAndAddValue(this.currentIncome, "100000");
            await browser.clickAndAddValue(this.currentRetirementSavings, "500000");
            await browser.clickAndAddValue(this.currentRetirementContribution, "10");
            await browser.clickAndAddValue(this.savingsIncreaseRate, "1");
        }
        if (form_data == "all") {
            await browser.clickAndAddValue(this.spouseIncome, "75000");
        }
    }

    /**
     * Fill the details if benefits toggle is Yes
     * @param benefits_toggle
     * @param form_data
     * @param marital_status
     */
    public async fillSocialSecurityBenefitDetails(
        benefits_toggle: string,
        form_data: string,
        marital_status: string
    ) {
        if (benefits_toggle == "Yes") {
            await this.selectSocialBenefits(benefits_toggle);
            await this.selectMarriedStatus(marital_status);
            if (form_data == "all") {
                await browser.clickAndAddValue(this.socialSecurityOverride, "4000");
            }
        }
    }

    /**
     * Clicks "Calculate" button for submission
     */
    public async submitRetirementPlan() {
        await this.calculateResults.click();
        await browser.pause(10000);
    }

    /**
     * Select Social Secutiry benefits radio
     * @param benefits_toggle
     */
    public async selectSocialBenefits(benefits_toggle: string) {
        await this.yesSocialBenefits.scrollIntoView();
        if (benefits_toggle == "Yes") {
            await this.yesSocialBenefits.waitForClickable();
            await this.yesSocialBenefits.click();
        } else {
            await this.noSocialBenefits.waitForClickable();
            await this.noSocialBenefits.click();
        }
    }

    /**
     * Select Married Status radio
     * @param marital_status
     */
    public async selectMarriedStatus(marital_status: string) {
        await this.maritalStatusNo.waitForDisplayed();
        if (marital_status == "Single") {
            await this.maritalStatusNo.waitForClickable();
            await this.maritalStatusNo.click();
        } else {
            await this.maritalStatusYes.waitForClickable();
            await this.maritalStatusYes.click();
        }
    }

    /**
     * Click "Adjust Default Values" link to add default values
     */
    public async clickAdjustDefaultValues() {
        await this.adjustdefaultValues.click();
    }

    /**
     * Update Adjust default values
     * @param inflation
     */
    public async addAdjustDefaultValues(inflation: string) {
        await browser.clickAndAddValue(this.additionalIncome, "500");
        await this.retirementDuration.setValue("20");
        if (inflation === "Yes") {
            await this.includeInflation.waitForClickable();
            await this.includeInflation.click();

            await this.expectedInflationRate.waitForDisplayed();
            await this.expectedInflationRate.setValue("1");
        }

        await this.retirementAnnualncome.setValue("75");
        await this.preRetirementRoi.setValue("8");
        await this.postRetirementRoi.setValue("5");
    }

    /**
     * Click "Save Default Values" button to save default values
     */
    public async saveDefaultValues() {
        await this.savePersonalizedValues.scrollIntoView();
        await this.savePersonalizedValues.waitForClickable();
        await this.savePersonalizedValues.click();
    }
}

export default new RetirmentCalculatorPage();