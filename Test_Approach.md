Test Approach: Buggy Playground Application
**Author: Piyush Kumar Singh**
Date: 13-09-2025

**1. Objective**

The primary objective of this testing effort is to identify, document, and assess critical bugs within the "Buggy Playground" application. The focus is on finding functional defects, validation errors, and usability issues that would impact a real-world user.

**2. Scope**

*In Scope:

-Manual Functional Testing: Verification of all features presented in the user interface (Sign-up Wizard, Expense Splitter, Timezone Helper).-Input Validation Testing: Testing how the application handles a wide range of user inputs, including invalid, negative, boundary, and empty values.
-UI/UX Testing: Basic checks for usability, clarity of error messages, and logical workflow.

*Out of Scope:

Automated Testing (Execution)
Performance, Load, or Stress Testing
Security Vulnerability Assessment
Code-level analysis or review

**3. Risk-Based Strategy**
A risk-based strategy was adopted to prioritize testing efforts on the areas most likely to fail or have the greatest impact on the user. The assumption was that features involving user input and calculations carry the highest risk.

*The strategy combined two primary methods:

-Exploratory Testing: The initial phase involved unscripted, simultaneous learning and exploration of the application. This was used to quickly understand the application's functionality and discover unexpected defects and logical flaws in its workflows.-Negative and Boundary Value Analysis: After gaining a baseline understanding, testing efforts were focused on high-risk areas, specifically the input fields in all three modules. This involved systematically testing with invalid data types (text in number fields), out-of-bounds values (negative numbers, future dates), and special cases (division-by-zero) to ensure the application could handle them gracefully.

**4. Tools Used**
-Browser: Google Chrome (for manual testing and observation)
-Browser Developer Tools (F12): To check for console errors and inspect UI elements.
-Text Editor: Visual Studio Code (for documenting all deliverables).