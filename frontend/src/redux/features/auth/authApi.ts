import { baseApi } from "@/redux/api/baseApi";
import { AuthResponse, LoginRequest, SignupRequest, User } from "@/types/auth.types";

interface GetMeResponse {
  user: User;
}

// ---------- API ----------

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/user/me",
      transformResponse: (response: GetMeResponse) => response.user,
      providesTags: ["User"],
    }),

    // POST login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // POST signup
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (payload) => ({
        url: "/user/signup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // POST logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;