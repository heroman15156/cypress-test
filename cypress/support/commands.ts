Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request("POST", `${Cypress.env("apiUrl")}/auth/login`, { email, password })
    .its("status")
    .should("eq", 200);
});
