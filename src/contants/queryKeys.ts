import { createQueryKeys } from "@lukemorales/query-key-factory";

const authQueryKeys = createQueryKeys("auth", {
  profile: null,
  accessToken: null,
});

export { authQueryKeys };
