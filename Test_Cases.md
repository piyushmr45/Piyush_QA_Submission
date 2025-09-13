Lean Test Cases: Buggy Playground Application
**Author: Piyush Kumar Singh**
Date: 13-09-2025
| ID | Feature | Description | Steps | Expected Result |

# Test Cases

## Sign-up Wizard

**TC-01 (Happy Path):** Successful submission with all valid data

Steps:

    1.  Fill all fields with valid data.

    2.  Check "Agree to Terms".

    3.  Click "Next".

    Expected Result: The user proceeds to the Review stage with the correct data displayed.

**TC-02 (Negative):** Attempt submission with an empty "Full Name".

Steps:

    1.  Leave "Full Name" blank.

    2.  Fill all other fields.

    3.  Click "Next".

    Expected Result: The submission is blocked, and an error message appears on the "Full Name" field.

**TC-03 (Negative):** Attempt to enter a phone number with a country code.

Steps:

    1.  In the "Phone (India)" field, enter +919876543210.

    2.  Click "Next".

    Expected Result: An error message appears, or the input is correctly handled.

**TC-04 (Negative):** Attempt submission with a future date of birth.

Steps:

    1.  In the "Date of Birth" field, select a date from the future.

    2.  Click "Next".

    Expected Result: An error message "Date cannot be in the future" is displayed.

**TC-05 (Negative):** Attempt submission without agreeing to terms.

Steps:

    1.  Fill all fields with valid data.

    2.  Leave "Agree to Terms" unchecked.

    3.  Click "Next".

    Expected Result: The submission is blocked, and the user is prompted to agree to the terms.

**TC-06 (Boundary):** Test with a date of birth that is exactly 18 years ago.

Steps:

    1.  Enter a DOB that makes the user exactly 18.

    2.  Click "Next".

    Expected Result: The form is submitted successfully without any age-related errors.

## Expense Splitter

**TC-07 (Happy Path):** Correct calculation with standard inputs.

Steps:

    1.  Amount: 1000, People: 4, Tip: 10.

    2.  Click "Calculate".

    Expected Result: The result correctly displays Total: ₹1100, Each: ₹275.

**TC-08 (Negative):** Attempt calculation with 0 people (division by zero).

Steps:

    1.  Amount: 1000, People: 0.

    2.  Click "Calculate".

    Expected Result: An error message "Number of people must be greater than 0" is displayed.

**TC-09 (Negative):** Attempt calculation with a negative "Total Amount".

Steps:

    1.  Amount: -1000, People: 2.

    2.  Click "Calculate".

    Expected Result: An error message "Amount cannot be negative" is displayed.

**TC-10 (Negative):** Attempt calculation with a decimal value for "People".

Steps:

    1.  Amount: 1000, People: 2.5.

    2.  Click "Calculate".

    Expected Result: An error message "Number of people must be a whole number" is displayed.

**TC-11 (Boundary):** Test with a tip of 0%.

Steps:

    1.  Amount: 500, People: 2, Tip: 0.

    2.  Click "Calculate".

    Expected Result: The result correctly displays Total: ₹500, Each: ₹250.

## Timezone Helper

**TC-12 (Happy Path):** Correct conversion between two timezones.

Steps:

    1.  Enter a valid local date/time.

    2.  Select a target timezone.

    3.  Click "Convert".

    Expected Result: The converted date and time are displayed correctly for the target timezone.

**TC-13 (Negative):** Attempt conversion with an invalid time format.

Steps:

    1.  Enter 18-09-2025 17:84 as the time.

    2.  Click "Convert".

    Expected Result: An error message "Please enter a valid time" is displayed.

## Accessibility

**TC-14 (Accessibility):** Verify all form fields have aria-label attributes.

Steps:

    1.  Open Browser DevTools.

    2.  Inspect the "Full Name" input field.

    Expected Result: The input element contains a descriptive aria-label or label for attribute.

**TC-15 (Accessibility):** Check for sufficient color contrast.

Steps:

    1.  Use a color contrast analyzer tool on the error messages.

    Expected Result: The text color and background color have a contrast ratio of at least 4.5:1.
