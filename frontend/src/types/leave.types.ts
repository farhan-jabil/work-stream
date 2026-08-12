export type LeaveStatus = "pending" | "approved" | "rejected";

export interface Leave {
  _id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface RequestLeaveData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}