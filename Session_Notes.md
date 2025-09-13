Exploratory Session Notes
**Author: Piyush Kumar Singh**
Date: 13-09-2025
Duration: 90 minutes (approx. 4:10 PM - 5:40 PM)
**Charter/Mission:** To conduct a comprehensive exploratory test of the "Buggy Playground" application, identifying functional bugs, validation errors, and usability issues across all three modules.

**Phase 1: Sign-up & Profile Wizard**
My session began with the Sign-up Wizard, as it's the first feature presented to the user.
*Initial Test: I started by attempting to proceed through the form with several required fields left empty. I discovered that the form allowed me to advance to the "Review" stage even when "Full Name" and "Date of Birth" were blank. This was logged as Bug #1.
*Phone Number Field: I then tested the "Phone (India)" field by entering my number with the +91 country code. The application shows in review section without country code. This was logged as Bug #2.
*Date of Birth Field: To test boundary conditions, I entered a nonsensical future date (31-03-275760). The system correctly identified it as invalid but displayed a confusing and irrelevant error message, "Must be 18+". This was logged as Bug #3.
*Terms and Conditions: Finally, I noted that it was possible to get to the "Review" stage without checking the "I agree to the Terms" box, which was logged as Bug #4.

**Phase 2: Expense Splitter**
Next, I moved to the Expense Splitter, as financial calculation tools are a high-risk area for bugs.
*Zero/Invalid Inputs: I immediately tested for common mathematical errors.
-Entering 0 for "People" resulted in a ₹Infinity output, a critical division-by-zero error logged as Bug #5.
-Entering a decimal (2.5) for "People" was accepted but resulted in a mathematically incorrect calculation, logged as Bug #6.
*Negative Value Testing: I proceeded to test all numerical fields with negative values.
-The application incorrectly accepted and calculated results for a negative "Total Amount" (Bug #7), negative "People" (Bug #8), and negative "Tip %" (Bug #9). None of these inputs should have been allowed.
-Non-Numeric Input: To check validation, I entered non-numeric text (a single hyphen -) into the fields. The app failed to validate this input, leading to silent failures (treating the input as 0) or unhandled errors (Infinity). This was logged as Bug #10.

**Phase 3: Timezone Helper**
I concluded my session with the Timezone Helper.
*Core Functionality Test: I performed a standard conversion from my local time (India) to America/New_York. The feature failed completely. It produced a mathematically incorrect result and, most critically, failed to convert the timezone, leaving the output in "India Standard Time." This was logged as Bug #11.
*Invalid and Boundary Date Test: Further tests confirmed the feature was broken.
-It accepted an impossible time (17:84) and still produced an incorrect result (Bug #12).
-Testing with a boundary date (01-01-0001) also failed and revealed a historical timezone flaw.

**Session Conclusion**
The 90-minute session was highly effective, revealing numerous critical and high-severity bugs across all three of the application's core features. The most significant risks lie in the complete failure of the Timezone Helper and the severe calculation and validation errors in the Expense Splitter.