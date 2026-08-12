import { baseApi } from "@/redux/api/baseApi";
import { Leave, RequestLeaveData } from "@/types/leave.types";

interface GetAllLeavesResponse {
  requests: Leave[];
}

interface DeleteLeaveResponse {
  message: string;
  _id?: string;
}

interface UpdateLeaveStatusResponse {
  message: string;
  request?: Leave;
}

interface AddLeaveResponse {
  message: string;
  request?: Leave;
}

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaves: builder.query<Leave[], void>({
      query: () => ({
        url: "/request-leave/get-all",
        method: "GET",
      }),
      transformResponse: (response: GetAllLeavesResponse) => response.requests,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "LeaveRequests" as const,
                id: _id,
              })),
              { type: "LeaveRequests" as const, id: "LIST" },
            ]
          : [{ type: "LeaveRequests" as const, id: "LIST" }],
    }),

    addLeave: builder.mutation<AddLeaveResponse, RequestLeaveData>({
      query: (body) => ({
        url: "/request-leave/add",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "LeaveRequests", id: "LIST" }],
    }),

    deleteLeave: builder.mutation<DeleteLeaveResponse, string>({
      query: (id) => ({
        url: `/request-leave/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "LeaveRequests", id },
        { type: "LeaveRequests", id: "LIST" },
      ],
    }),

    updateLeaveStatus: builder.mutation<
      UpdateLeaveStatusResponse,
      { id: string; status: "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/request-leave/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "LeaveRequests", id },
        { type: "LeaveRequests", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllLeavesQuery,
  useAddLeaveMutation,
  useDeleteLeaveMutation,
  useUpdateLeaveStatusMutation,
} = leaveApi;