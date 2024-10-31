import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "@/features/auth/compoents/LoginForm.tsx";

describe("LoginForm", () => {
  const mockSubmit = vi.fn();
  let elements: {
    submitButton: HTMLElement;
    emailInput: HTMLElement;
    passwordInput: HTMLElement;
  };
  const renderLoginForm = (isLoading = false) => {
    render(<LoginForm onSubmit={mockSubmit} isLoading={isLoading} />);

    elements = {
      submitButton: screen.getByTestId("submit-button"),
      emailInput: screen.getByTestId("email-input"),
      passwordInput: screen.getByTestId("password-input"),
    };
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  describe("랜더링", () => {
    beforeEach(() => {
      renderLoginForm(); // 로딩 상태로 렌더링
    });
    it("모든 필수 필드와 버튼이 랜더링되어야 함.", () => {
      // render(<LoginForm onSubmit={mockSubmit} />);
      expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument(); // 여기를 수정
      expect(
        screen.getByRole("button", { name: /로그인/i }),
      ).toBeInTheDocument();
    });
  });

  describe("유효성 검사", () => {
    beforeEach(() => {
      renderLoginForm(); // 로딩 상태로 렌더링
    });
    it("이메일이 비어있으면 에러 메세지를 표시해야 함.", async () => {
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toHaveTextContent(
          /이메일을 입력해주세요/i,
        );
      });
    });

    it("비밀번호가 비어있으면 에러 메세지를 표시해야 함.", async () => {
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("password-error")).toHaveTextContent(
          /비밀번호를 입력해주세요/i,
        );
      });
    });
    it("비밀번호가 4자 미만이면 에러 메세지를 표시해야 함", async () => {
      fireEvent.change(elements.passwordInput, { target: { value: "123" } });
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("password-error")).toHaveTextContent(
          /비밀번호는 최소 4자 이상/i,
        );
      });
    });
  });

  describe("Form 제출", () => {
    beforeEach(() => {
      renderLoginForm(true); // 로딩 상태로 렌더링
    });

    it("유효한 데이터로 폼 제출 시 onSubmit이 호출이 되어야 함", async () => {
      fireEvent.change(elements.emailInput, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(elements.passwordInput, {
        target: { value: "password123" },
      });

      const form = screen.getByRole("form");
      fireEvent.submit(form);
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          {
            email: "test@example.com",
            password: "password123",
          },
          expect.anything(),
        );
      });
    });
    it("로딩 중일 때 버튼이 비활성화되어야 함", async () => {
      expect(elements.submitButton).toBeDisabled();
      expect(elements.submitButton).toHaveTextContent(/로그인 중/i);
    });
  });
});
