# Sauce Demo Test Automation

Test script which covers the sauce demo scenarios using Cypress.

## Prerequisite

- Node JS > v14.X
- Cypress verison as per the `package.json` file.

## Cypress Installation & Project setup

### Install the tests

1. Download Node & NPM (<https://nodejs.org/en/download/>)

2. Set `NODE_HOME` Environment Variable
   1. Go to Control Panel\System and Security\System
   2. Click Environment Variables > System Variables> New
   3. Set Variable name:  for ex: `Node_HOME`
   4. Set Variable value – Specify the location where exactly node js is installed.

### To Run 
1. Run: `npm install` (Note: This step can be run to update the installed libraries at any time)
2. Run: `npm run generatetestData`
3. Run: `npm run saucedemo-chrome -- --headed`

### Run a Text Suite

Note that adding `--headed` to the end of any of the following command lines will run the test with a visible browser. Otherwise the browser (if used) will not be visible.

Run one of the following commands:

#### Run the SauceDemo Test Script
    - `npm run generatetestData`  # to run this command for generate test data
    - `npm run saucedemo-chrome --` # to run the Sauce demo script in a Chrome browser.
    - `npm run saucedemo-firefox --` # to run the Sauce demo script in a Firefox browser.
    - `npm run saucedemo-edge --` # to run the Sauce demo script in a a Edge browser.
    - `npm run saucedemo-headless --'` # This will run the to run the Sauce demo script in the command line, in headless mode, using a generic “browser”


### Example Success Output

```Output

Sauce Demo Specs
    √ SD-001 Verify the total product lists are listed in the sauce demo Correctly (6282ms)
    √ SD-002 Verify Filters are working according to the filtered option (2050ms)
    √ SD-003 Verify Product Details in Product details page (1299ms)
    √ SD-004 Verify the Add to cart/Remove Count after added/Removed the product into cart (1421ms)
    √ SD-005 Verify the Product Details in cart Page after added the product into cart (1731ms)
    √ SD-006 Verify the Continue shopping and remove after add items in carts page (2166ms)
    √ SD-007 Verify the Add to cart added details retains after logout and login again (2973ms)
    √ SD-008 Verify the Add to cart added details in the checkout page (3109ms)


  8 passing (29s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        8                                                                                │
  │ Passing:      8                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     29 seconds                                                                       │
  │ Spec Ran:     SauceDemo/SauceDemo.spec.js                                                      │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  SauceDemo/SauceDemo.spec.js              00:29        8        8        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:29        8        8        -        -        -

====================================================================================================
