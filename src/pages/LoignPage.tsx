import { useState } from "react";
import { LoginForm } from "@/features/auth/compoents/LoginForm.tsx";
import { LoginFormData } from "@/features/auth/schemas/auth.schema.ts";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (data: LoginFormData) => {
    try {
      console.log("Sending fetch request to /auth/login"); // 확인용 콘솔 로그

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("인증에 실패했습니다. 이메일과 비밀번호를 확인해 주세요."); // 에러 메시지 설정
        } else {
          setError("로그인 중 오류가 발생했습니다.");
        }
        return;
      }

      navigate("/"); // 성공 시 리디렉션
    } catch (error) {
      console.log(error);
      setError("로그인 중 네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && ( // 에러 메시지 표시
        <p className="text-red-500" data-testid="error-message">
          {error}
        </p>
      )}
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
