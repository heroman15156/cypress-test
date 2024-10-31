import {
  SignupFormData,
  signupSchema,
} from "@/features/auth/schemas/auth.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type SignupFormProps = {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading?: boolean;
};

export type SignupForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const SignupForm = ({ onSubmit, isLoading }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          이름
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full rounded-lg border p-2"
          placeholder="홍길동"
          data-testid="name-input"
        />
        {errors.name && (
          <p className="text-sm text-red-500" data-testid="name-error">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          이메일
        </label>
        <input
          {...register("email")}
          id="email"
          className="w-full rounded-lg border p-2"
          placeholder="name@example.com"
          data-testid="email-input"
        />
        {errors.email && (
          <p className="text-sm text-red-500" data-testid="email-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          비밀번호
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="w-full rounded-lg border p-2"
          placeholder="********"
          data-testid="password-input"
        />
        {errors.password && (
          <p className="text-sm text-red-500" data-testid="password-error">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="passwordConfirm" className="block text-sm font-medium">
          비밀번호 확인
        </label>
        <input
          {...register("passwordConfirm")}
          id="passwordConfirm"
          type="password"
          className="w-full rounded-lg border p-2"
          placeholder="********"
          data-testid="password-confirm-input"
        />
        {errors.passwordConfirm && (
          <p
            className="text-sm text-red-500"
            data-testid="password-confirm-error"
          >
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 disabled:opacity-50"
        data-testid="submit-button"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
};
