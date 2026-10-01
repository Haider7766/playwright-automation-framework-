/**
 * Locators — Opportunity Type screen
 * Real selectors confirmed from the actual app (via DevTools inspect).
 * Items still marked PLACEHOLDER haven't been confirmed yet.
 */
export const OpportunityTypeLocators = {
  addNewButton: "button[class='mo-btn-label add create-btn col-sm-auto'] span[class='bl-tx']",
  codeInput: '#code',
  nameInput: '#name',
  descriptionInput: '#description',
  saveButton: "button[type='submit']",

  editIconInRow: 'td:nth-child(7) div:nth-child(1) a:nth-child(1)', // PLACEHOLDER — confirm this is Edit
  deleteIconInRow: 'td:nth-child(7) div:nth-child(1) a:nth-child(2)',

  cancelButton: { role: 'button', name: 'Cancel' } as const,
  auditBlock: 'audit-block',
 savedToast: 'Opportunity Type Created Successfully',
 deletedToast: 'Opportunity Type Deleted Successfully',

  codeRequiredMessage: 'Code is required',
  nameRequiredMessage: 'Name is required',

 alreadyExistsMessage: 'Record already exists.',

  blockedDeleteMessage:
    'This Opportunity Type cannot be deleted because it is in use. Inactivate it instead.',
  deleteConfirmButton: { role: 'button', name: 'Delete' } as const,

  // Advanced Search panel (confirmed selectors)
  advancedSearchNameInput:
    "body > app-root:nth-child(1) > app-layout:nth-child(3) > app-vertical:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > app-opportunity-types-list:nth-child(2) > app-advanced-search:nth-child(3) > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > dynamic-form:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input-field:nth-child(1) > div:nth-child(1) > input:nth-child(1)",
  advancedSearchCodeInput:
    "body > app-root:nth-child(1) > app-layout:nth-child(3) > app-vertical:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > app-opportunity-types-list:nth-child(2) > app-advanced-search:nth-child(3) > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > dynamic-form:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input-field:nth-child(1) > div:nth-child(1) > input:nth-child(1)",
  applyFiltersButton: "button[class='btn btn-primary']",
clearAllFiltersButton: "button[class='clear']",
// Export
exportDropdownButton: "button[id='exportDropdown'] span[class='bl-tx']",
exportToCsvOption:
  "body > app-root:nth-child(1) > app-layout:nth-child(3) > app-vertical:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > app-opportunity-types-list:nth-child(2) > app-breadcrumbs:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(2)",
exportToExcelOption: "div[class='dropdown-menu mo-menu-pop show'] button:nth-child(1)",
};