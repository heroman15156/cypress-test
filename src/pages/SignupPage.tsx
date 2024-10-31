import { SignupForm } from "@/features/auth/compoents/SignupForm.tsx";
import { useState } from "react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (data: SignupForm) => {
    console.log(data, "data");
    setIsLoading(false);
  };
  return (
    <div>
      <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
