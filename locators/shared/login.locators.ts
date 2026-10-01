/**
 * Locators — Login flow
 * Kept separate from the Page class so a selector change is a one-line fix
 * here, without touching any page logic or test code (same idea as your
 * Cypress locators file).
 */
export const LoginLocators = {
  // Step 1 — https://middleofficeqa.croeminc.com:9083/auth/login
  proceedToLoginButton: "button[type='button']",

  // Step 2 — https://middleoffice-qa-ids.croeminc.com:8443/
  usernameInput: '#UserName',
  passwordInput: '#Password',
  submitButton: "button[type='submit']",
};
