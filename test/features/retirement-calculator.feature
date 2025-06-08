@RetirmentCalculator
Feature: Retirement Savings Calculator Feature

#• User should be able to submit form with required fields filled in
#• User should be able to submit form with all fields filled in
Scenario Outline: Verify user should be able to submit form with "<form_data>" fields
    Given the user is on the Retirement Savings Calculator form page
    When the user fill in "<form_data>" fields with valid data
    And clicks the "Calculate" button
    Then the user should see a success message

    Examples:
    | form_data |
    | required  |
    | all       |

#• User should be able to submit form with required fields filled in "with additional Social Security fields"
#• User should be able to submit form with all fields filled in "with additional Social Security fields"
@social_benefits
Scenario Outline: Verify user should be able to submit form with "<form_data>" fields with Social Security Benfits
    Given the user is on the Retirement Savings Calculator form page
    When the user fill in "<form_data>" fields with valid data
    And selects the Social Security benefits "<benefits_toggle>" with "<form_data>" fields and maried status "<marital_status>"
    And clicks the "Calculate" button
    Then the user should see a success message

    Examples:
    | form_data | benefits_toggle   | marital_status |
    | required  | Yes               |    Single      |
    | required  | Yes               |    Married     |
    | all       | Yes               |    Single      |
    | all       | Yes               |    Married     |

#• User should be able to update default calculator values and submit form
Scenario Outline: Verify user should be able to submit form with "<form_data>" fields filled in without Social Security Benfits
    Given the user is on the Retirement Savings Calculator form page
    When the user fill in "<form_data>" fields with valid data
    And updates default calculator values
    And clicks the "Calculate" button
    Then the user should see a success message

    Examples:
    | form_data |
    | required  |
    | all       |

#• User should be able to update default calculator values and submit form
# with Social security benefits
@social_benefits
Scenario Outline: Verify user should be able to submit form with "<form_data>" fields filled in with Social Security Benfits
    Given the user is on the Retirement Savings Calculator form page
    When the user fill in "<form_data>" fields with valid data
    And selects the Social Security benefits "<benefits_toggle>" with "<form_data>" fields and maried status "<marital_status>"
    And updates default calculator values
    And clicks the "Calculate" button
    Then the user should see a success message

    Examples:
    | form_data | benefits_toggle   | marital_status |
    | required  | Yes               |    Single      |
    | required  | Yes               |    Married     |
    | all       | Yes               |    Single      |
    | all       | Yes               |    Married     |

#• Additional Social Security fields should display/hide based on Social Security benefits toggle
@social_benefits
Scenario Outline: Verify additional Social Security fields should display/hide based on benefits toggle
  Given the user is on the Retirement Savings Calculator form page
  When the user selects the Social Security benefits toggle as "<benefits_toggle>"
  Then the additional Social Security fields should be "<visibility>" on the form

Examples:
  | benefits_toggle | visibility |
  | Yes             | visible    |
  | No              | hidden     |

#• User should see error message if all or some required fields not filled in
Scenario: Verify error messages when required fields are missing
    Given the user is on the Retirement Savings Calculator form page
    When the user clicks the "Calculate" button without required fields filled
    Then the user should see an error message for required fields