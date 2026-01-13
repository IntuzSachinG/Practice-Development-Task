

import { createContext, useReducer, useEffect } from "react";
import { taskReducer } from "../context/taskReducer";

export const TaskContext = createContext();

const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
