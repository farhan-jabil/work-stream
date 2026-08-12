import { baseApi } from "@/redux/api/baseApi";
import { Employee } from "@/types/employee.types";

interface GetEmployeeResponse {
  employee: Employee;
}

interface GetAllEmployeesResponse {
  employees: Employee[];
}

interface EmployeeMutationResponse {
  message: string;
  employee?: Employee;
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/admin/employee-manage/get-all",
        method: "GET",
      }),
      transformResponse: (response: GetAllEmployeesResponse) =>
        response.employees,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Employees" as const,
                id: _id,
              })),
              { type: "Employees" as const, id: "LIST" },
            ]
          : [{ type: "Employees" as const, id: "LIST" }],
    }),

    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/admin/employee-manage/get/${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetEmployeeResponse) => response.employee,
      providesTags: (_result, _error, id) => [{ type: "Employees", id }],
    }),

    addEmployee: builder.mutation<EmployeeMutationResponse, Employee>({
      query: (body) => ({
        url: "/admin/employee-manage/add",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),

    editEmployee: builder.mutation<
      EmployeeMutationResponse,
      { id: string; data: Employee }
    >({
      query: ({ id, data }) => ({
        url: `/admin/employee-manage/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Employees", id },
        { type: "Employees", id: "LIST" },
      ],
    }),

    deleteEmployee: builder.mutation<EmployeeMutationResponse, string>({
      query: (id) => ({
        url: `/admin/employee-manage/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Employees", id },
        { type: "Employees", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
