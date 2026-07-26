import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth-token");
        if (token) {
          headers.set("auth-token", token);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Employees", "LeaveRequests"],
  endpoints: () => ({}),
});