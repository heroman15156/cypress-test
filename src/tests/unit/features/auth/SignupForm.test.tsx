import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  SignupForm,
  SignupFormProps,
} from "@/features/auth/compoents/SignupForm";

describe("SignupForm", () => {
  const mockSubmit = vi.fn();

  // 타입 선언 수정
  let elements: {
    nameInput: HTMLElement | null;
    emailInput: HTMLElement | null;
    passwordInput: HTMLElement | null;
    passwordConfirmInput: HTMLElement | null;
    submitButton: HTMLElement | null;
  } = {
    nameInput: null,
    emailInput: null,
    passwordInput: null,
    passwordConfirmInput: null,
    submitButton: null,
  };

  const renderSignupForm = (isLoading = false) => {
    mockSubmit.mockClear();
    const props: SignupFormProps = {
      onSubmit: mockSubmit,
      isLoading,
    };

    render(<SignupForm {...props} />);

    elements = {
      nameInput: screen.getByTestId("name-input"),
      emailInput: screen.getByTestId("email-input"),
      passwordInput: screen.getByTestId("password-input"),
      passwordConfirmInput: screen.getByTestId("password-confirm-input"),
      submitButton: screen.getByTestId("submit-button"),
    };
  };

  const validFormData: SignupForm = {
    name: "james",
    email: "test@example.com",
    password: "password",
    passwordConfirm: "password",
  };

  const fillForm = (data: Partial<SignupForm> = validFormData) => {
    if (data.name && elements.nameInput) {
      fireEvent.change(elements.nameInput, { target: { value: data.name } });
    }

    if (data.email && elements.emailInput) {
      fireEvent.change(elements.emailInput, { target: { value: data.email } });
    }
    if (data.password && elements.passwordInput) {
      fireEvent.change(elements.passwordInput, {
        target: { value: data.password },
      });
    }
    if (data.passwordConfirm && elements.passwordConfirmInput) {
      fireEvent.change(elements.passwordConfirmInput, {
        target: { value: data.passwordConfirm },
      });
    }
  };

  describe("기본 랜더링 및 유효성 검사", () => {
    beforeEach(() => {
      renderSignupForm();
    });

    it("모든 필수 필드와 버튼이 랜더링되어야 함", () => {
      expect(elements.nameInput).toBeInTheDocument();
      expect(elements.passwordInput).toBeInTheDocument();
      expect(elements.passwordConfirmInput).toBeInTheDocument();
      expect(elements.submitButton).toBeInTheDocument();
    });

    it("필수 필드가 비어있을 때 에러 메세지를 표시해야 함", async () => {
      if (!elements.submitButton) return;

      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("name-error")).toHaveTextContent(
          /이름을 입력해주세요/i,
        );

        expect(screen.getByTestId("email-error")).toHaveTextContent(
          /이메일을 입력해주세요/i,
        );

        expect(screen.getByTestId("password-error")).toHaveTextContent(
          /비밀번호를 입력해주세요/i,
        );

        expect(screen.getByTestId("password-confirm-error")).toHaveTextContent(
          /비밀번호 확인을 입력해주세요./i,
        );
      });
    });

    it("이름이 2자 미만일 떄 에러 메시지를 표시해야 함", async () => {
      fillForm({ name: "김" });
      if (!elements.submitButton) return;
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("name-error")).toHaveTextContent(
          /이름은 최소 2자 이상이어야 합니다/i,
        );
      });
    });

    it("이메일 형식이 올바르지 않을 때 에러메시지를 표시해야 함", async () => {
      fillForm({ email: "invalidemail" });

      if (!elements.submitButton) return;
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("email-error")).toHaveTextContent(
          "올바른 이메일 형식이 아닙니다",
        );
      });
    });

    it("비밀번호가 일치않을 때 에러메시지를 표시해야 함", async () => {
      fillForm({
        ...validFormData,
        password: "password",
        passwordConfirm: "password1234",
      });
      if (!elements.submitButton) return;
      fireEvent.click(elements.submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("password-confirm-error")).toHaveTextContent(
          /비밀번호가 일치하지 않습니다/i,
        );
      });
    });
  });
  describe("폼 제출 및 로딩 상태", () => {
    it("유효한 데이터로 폼 제출 시 onSubmit이 호출되어야 함", async () => {
      renderSignupForm();
      fillForm(validFormData);

      const form = screen.getByRole("form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          {
            email: validFormData.email,
            password: validFormData.password,
            passwordConfirm: validFormData.passwordConfirm,
            name: validFormData.name,
          },
          expect.anything(),
        );
      });
    });

    it("제출 중에는 버튼이 비활성화 되고 로딩 상태를 표시해야 함", async () => {
      renderSignupForm(true);
      fillForm(validFormData);

      expect(elements.submitButton).toBeDisabled();
      expect(elements.submitButton).toHaveTextContent("가입 중");
    });
  });
});
