import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },

    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      console.log(err);
    },
  }),

  mutationCache: new MutationCache({
    onError: (err) => {
      console.log(err);
    },
  }),
});

export default queryClient;
