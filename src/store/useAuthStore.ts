import { User } from "@/apis/user/type.ts";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
