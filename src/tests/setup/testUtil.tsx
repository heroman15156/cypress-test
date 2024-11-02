import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

export type WrapperProps = {
  children: React.ReactNode;
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();

  return ({ children }: WrapperProps) => (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const createTestWrapper = () => {
  const testQueryClient = createTestQueryClient();

  const TestWrapper: React.FC<WrapperProps> = ({ children }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );

  return TestWrapper;
};

export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
