export interface AuthData {
  validCredentials: {
    email: string;
    password: string;
  };
  invalidCredentials: {
    email: string;
    password: string;
  };
  errorMessages: {
    email: string;
    password: string;
    unauthorized: string;
  };
}
