import {
  LoginFormData,
  loginSchema,
} from "@/features/auth/schemas/auth.schema.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form">
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 disabled:opacity-50"
        data-testid="submit-button"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};
