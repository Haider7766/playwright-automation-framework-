# Running the QA Automation Suite — Team Setup Guide
 
Follow these steps once, on your own machine, to get the Playwright test suite running.
 
## 1. Prerequisites
 
- **Node.js** (v20.x) must be installed.
  Check with: `node -v`
  If missing, install from [nodejs.org](https://nodejs.org).
- **Git** must be installed and you must have already cloned this repo.
## 2. Install Dependencies
 
Inside the repo folder, run:
 
```
npm ci
```
 
This installs all required packages exactly as locked in `package-lock.json`.
 
## 3. Install Playwright Browsers
 
```
npx playwright install --with-deps chromium
```
 
This downloads the Chromium browser Playwright needs. You only need to do this once per machine.
 
## 4. Create Your Own `.env` File (Required — Do Not Skip)
 
The `.env` file is intentionally **not** included in the repo (it's listed in `.gitignore`, since it holds credentials). This means **every team member must create their own copy**.
 
In the repo's root folder, create a new file named exactly `.env` containing:
 
```
QA_USERNAME=your_username
QA_PASSWORD=your_password
```
 
> If this step is skipped, tests will fail at login with an error about missing credentials.
 
## 5. Run the Full Suite
 
```
npx playwright test --project=chromium
```
 
This runs every test, across every catalog. The first test to run is always the login/setup step — it logs in once and saves the session to a local `.auth` folder, which every other test then reuses (so you won't see a login happen for every single test).
 
## 6. Other Useful Commands
 
| What you want to do | Command |
|---|---|
| Run only one catalog's tests | `npx playwright test tests/opportunity-type --project=chromium` |
| Watch the browser while it runs | Add `--headed` to any of the above |
| View the last HTML report | `npx playwright show-report` |
| Run one specific test file | `npx playwright test tests/opportunity-type/opportunity-type-create.spec.ts --project=chromium` |
 
## Notes
 
- Do not close any browser window manually while a `--headed` run is in progress — it can cause an unrelated test to fail mid-run.
- If a test fails with a timeout on the very first navigation of a run, it's usually just this QA environment being slow to load for the first time — try running it again before assuming there's a real bug.
- New catalogs follow the same folder pattern: `locators/<catalog>/`, `pages/<catalog>/`, `tests/<catalog>/`. The `shared` folder (login, navigation) is reused by every catalog and should not be duplicated.
 //npx playwright codegen https://example.com