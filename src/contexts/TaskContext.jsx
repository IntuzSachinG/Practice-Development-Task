import { createContext, useReducer, useEffect, useMemo } from "react";
import { TaskReducer } from "./TaskReducer";

// !!  Global context for tasks
export const TaskContext = createContext();

// !! Context provider for task state
export const TaskProvider = ({ children }) => {
  // Load tasks from localStorage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, dispatch] = useReducer(TaskReducer, storedTasks);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ tasks, dispatch }), [tasks]);

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
