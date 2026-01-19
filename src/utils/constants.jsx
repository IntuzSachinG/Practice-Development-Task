export const TASK_STATUS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const STATUS_OPTIONS = Object.values(TASK_STATUS);
export const PRIORITY_OPTIONS = Object.values(TASK_PRIORITY);

export const ACTION_TYPES = {
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_PRIORITY: "TOGGLE_PRIORITY",
  TOGGLE_STATUS: "TOGGLE_STATUS",
};
