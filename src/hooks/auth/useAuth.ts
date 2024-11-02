import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authAPI } from "@/apis/auth/mutation.ts";
import { LoginRequest, LoginResponse } from "@/apis/auth/types.ts";
import { AxiosError } from "axios";
import { User } from "@/apis/user/type.ts";
import { userAPI } from "@/apis/user/mutation.ts";
import useAuthStore from "@/store/useAuthStore.ts";
import { authQueryKeys } from "@/contants/queryKeys.ts";

const useSignup = () => {
  return useMutation({
    mutationFn: authAPI.signUp,
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  const { setAccessToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: authAPI.signIn,
    onSuccess: (data) => {
      setAccessToken(data.tokens.accessToken);
      setUser(data.user);
      queryClient.setQueryData(authQueryKeys.profile.queryKey, data.user);
      navigate(location.state?.returnPath || "/", { replace: true });
    },
  });
};

const useRefreshToken = () => {
  return useQuery({
    queryKey: authQueryKeys.accessToken.queryKey,
    queryFn: authAPI.getAccessToken,
    enabled: false,
  });
};

const useProfile = () => {
  const { setUser, accessToken } = useAuthStore();

  const query = useQuery<User, AxiosError>({
    queryKey: authQueryKeys.profile.queryKey,
    queryFn: userAPI.getProfile,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (query.data) {
      setUser({
        email: query.data.email,
        name: query.data.name,
        id: query.data.id,
      });
    }
  }, [query.data, setUser]);
  return query;
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setUser } = useAuthStore();
  return useMutation<{ success: boolean }, AxiosError>({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      setAccessToken(null);
      setUser(null);
      queryClient.removeQueries({
        queryKey: authQueryKeys.accessToken.queryKey,
      });
      queryClient.removeQueries({ queryKey: authQueryKeys.profile.queryKey });
    },
    onSettled: () => {},
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useRefreshToken();
  const profileQuery = useProfile();
  const logoutMutation = useLogout();
  return {
    isLogin: profileQuery.isSuccess,
    signupMutation,
    loginMutation,
    refreshTokenQuery,
    userInfo: profileQuery.data,
    logoutMutation,
  };
};
export default useAuth;
