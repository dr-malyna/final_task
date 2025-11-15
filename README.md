# final-task-epam
Automated UI testing project using WebdriverIO, Mocha, and the Page Object Model (POM).

# Swag Labs (WebdriverIO)

End‑to‑end UI tests for Swag Labs login using WebdriverIO, Mocha, and the Page Object pattern. Includes parallel execution, structured logging (spec, Allure, Junit), and data‑driven tests for accepted usernames.

## Table of Contents
- Features
- Tech stack
- Getting started
- Configuration
- Scenarios
- Parallel execution
- License

## Features
- Page Object Model with XPath locators and assertions via expect‑webdriverio
- Data‑driven tests for multiple usernames (UC‑3)
- Parallel test execution across capabilities
- Structured logging via spec reporter and Allure/JUnit reports

## Tech stack
- Runtime: Node.js (WebdriverIO runner)
- Framework: WebdriverIO v8 + Mocha
- Assertions: expect‑webdriverio
- Reporters: spec, Allure and JUnit
- Browsers: Chrome and Firefox

## Getting started
1) Prerequisites
- Node.js LTS (18/20/22)
- Chrome, Firefox installed

2) Install dependencies
- npm install

3) Run tests in terminal
- npx wdio run ./config/wdio.conf.js

4) Optional: Allure report
- Generate: npx allure generate allure-results --clean -o allure-report
- Open: npx allure open 

5) Optional: JUnit XML
- XML files appear in reports/junit after a run (if JUnit reporter is enabled).

## Configuration
Key parts of config/wdio.conf.js:
- specs: ["../src/test/specs/**/*.js"]
- maxInstances: 2 (tune for CI)
- capabilities: [{ browserName: ["chrome", "firefox"]}]
- reporters: ["spec", ["allure", { "outputDir": "./report/allure" }], ["junit", { "outputDir": "./report/junit" }]]
- Retries (optional):
  - specFileRetries: 1
  - specFileRetriesDelay: 2
  - specFileRetriesDeferred: true

## Scenarios
- UC‑1: Empty credentials
  - Steps: type username/password, clear both fields, submit, assert “Username is required”.
- UC‑2: Password cleared
  - Steps: type username/password, clear password, submit, assert “Password is required”.
- UC‑3: Valid logins
  - Iterate accepted usernames, login with secret_sauce, assert title “Swag Labs” and inventory page, then logout.
  - Negative case for locked_out_user asserts locked‑out message.

## Parallel execution
- maxInstances controls total concurrency.
- Add multiple capabilities for cross‑browser runs:
  - capabilities: [{ browserName: "chrome" }, { browserName: "firefox" }]
- Each spec runs in its own worker; tune maxInstances per CI resources.

## License
MIT
[9](https://www.reddit.com/r/learnprogramming/comments/vxfku6/how_to_write_a_readme/)
[10](https://www.youtube.com/watch?v=eVGEea7adDM)
