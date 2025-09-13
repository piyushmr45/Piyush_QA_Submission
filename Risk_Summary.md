Risk Summary: Buggy Playground Application
**Author: Piyush Kumar Singh**
Date: 13-09-2025
Introduction
**This document summarizes the key risks identified during a 90-minute exploratory testing session of the "Buggy Playground" application. The testing revealed multiple critical and high-severity defects that significantly impact the application's functionality, reliability, and user experience.**

Top Risks
**1 Critical Failure of Core Functionality (High Risk)**
The Timezone Helper is fundamentally broken and non-functional. It fails to perform its primary task of converting timezones, provides mathematically incorrect results, and does not validate user input. As it stands, the entire feature is unusable and delivers a negative user experience.
**2 Severe Calculation and Validation Errors (High Risk)**
The Expense Splitter contains critical bugs that compromise its reliability. It is vulnerable to a division-by-zero error that crashes the calculation (Infinity output). Furthermore, it lacks basic input validation, incorrectly accepting negative values, decimals, and non-numeric text, leading to nonsensical and untrustworthy financial results.
**3 Systemic Lack of Form Validation (Medium Risk)**
The Sign-up Wizard allows users to proceed with empty required fields (e.g., Full Name, Date of Birth) and without agreeing to the terms. This indicates a systemic weakness in data validation that could lead to incomplete user profiles and potential legal compliance issues.

Quick Wins
**Improve Error Messaging:**
The error messages are often misleading. For example, replacing the "Must be 18+" error for an invalid date with "Please enter a valid date" is a simple text change that significantly improves usability.
**Clarify Field Labels:**
The "Phone (India)" field label should be updated to "10-Digit Mobile Number" to match its validation rule and prevent user confusion.

Automation Recommendations
To improve regression testing and ensure stability, the following 3-5 test cases are recommended for automation first:
**Expense Splitter - Division by Zero Test:**
-Rationale: This test covers a critical, application-breaking bug. Automating it will ensure this specific high-severity defect does not reappear in future builds.
**Sign-up Wizard - Happy Path Submission:**
-Rationale: This is the most critical user workflow. A successful sign-up is the entry point for users, and this "smoke test" should always pass to confirm the application is viable for further testing.
**Expense Splitter - Correct Calculation Test:**
Rationale: This validates the core business logic of the feature. An automated test with a standard set of inputs (e.g., Amount: 1000, People: 4, Tip: 10) will guarantee the math is always correct.
**Sign-up Wizard - Empty Required Field Test:**
Rationale: This test ensures that basic form validation is working. It's a quick, high-value check to prevent incomplete data from being submitted.