import { AuthData } from "../types/auth";

declare global {
  namespace Cypress {
    interface Chainable {
      // authData 타입 지정
      authData: AuthData;
    }
  }
}

// `this.authData`를 사용할 때 타입으로 인식하도록 설정
declare global {
  namespace Mocha {
    interface Context {
      authData: AuthData;
    }
  }
}
