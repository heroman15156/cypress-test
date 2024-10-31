import { routes } from "../../../src/contants/path";
import { LoginPage } from "./LoginPage";
import { interceptLogin } from "../../utils/api";

describe("로그인 페이지", function () {
  beforeEach(function () {
    // function 키워드로 변경
    cy.fixture("auth").as("authData"); // Fixture 파일 로드
    cy.visit(routes.LOGIN);
  });

  it("로그인 폼이 올바르게 랜더링되어야 합니다.", () => {
    cy.get('[data-testid="email-input').should("be.visible");
    cy.get('[data-testid="password-input').should("be.visible");
    cy.get('[data-testid="submit-button').should("be.visible");
  });

  it("유효하지 않은 입력에 대해 유효성 검사 오류가 표시되어야 합니다", () => {
    LoginPage.typeEmail("invalidEmail");
    LoginPage.typePassword("123");

    LoginPage.submit();

    cy.get(LoginPage.emailError).should(
      "contain",
      "올바른 이메일 형식이 아닙니다",
    );
    cy.get(LoginPage.passwordError).should(
      "contain",
      "비밀번호는 최소 4자 이상이어야 합니다",
    );
  });
  it("올바른 자격증명으로 폼 제출에 성공해야 합니다.", function () {
    const { validCredentials } = this.authData;
    interceptLogin(true);
    LoginPage.typeEmail(validCredentials.email);
    LoginPage.typePassword(validCredentials.password);
    LoginPage.submit();

    cy.wait("@loginRequest");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("잘못된 자격 증명으로 로그인 실패 시 오류 메시지가 표시되어야 합니다.", function () {
    const { validCredentials } = this.authData;
    interceptLogin(false);
    LoginPage.typeEmail(validCredentials.email);
    LoginPage.typePassword(validCredentials.password);
    LoginPage.submit();

    cy.get(LoginPage.errorMessage).should("contain", "인증에 실패했습니다");
  });
});
