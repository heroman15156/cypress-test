declare namespace Cypress {
  interface Chainable {
    /**
     * 로그인 사용자 정의 명령어
     * @param email - 로그인에 사용할 이메일
     * @param password - 로그인에 사용할 비밀번호
     */
    login(email: string, password: string): Chainable<void>;
  }
}
