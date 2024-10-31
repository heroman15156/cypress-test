export function interceptLogin(success = true) {
  console.log("Intercepting request:", "Success:", success); // 상태 확인
  cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/login`, (req) => {
    console.log("Intercepting:", req.url);

    if (success) {
      req.reply({ statusCode: 200, body: { token: "fakeToken " } });
    } else {
      console.log("failed");
      req.reply({ statusCode: 401, body: { error: "Unauthorized" } });
    }
  }).as("loginRequest");
}
