import { ACTION_TYPES } from "../utils/constants";

// !! Reducer for all task-related actions
export const TaskReducer = (state, action) => {
  const handlers = {
    [ACTION_TYPES.ADD_TASK]: () => [...state, action.task],

    [ACTION_TYPES.UPDATE_TASK]: () =>
      state.map((task) =>
        task.id === action.task.id
          ? {
              ...task,
              title: action.task.title,
              description: action.task.description,
            }
          : task
      ),

    [ACTION_TYPES.DELETE_TASK]: () =>
      state.filter((task) => task.id !== action.id),

    [ACTION_TYPES.TOGGLE_PRIORITY]: () =>
      state.map((task) =>
        task.id === action.id ? { ...task, priority: action.priority } : task
      ),

    [ACTION_TYPES.TOGGLE_STATUS]: () =>
      state.map((task) =>
        task.id === action.id ? { ...task, status: action.status } : task
      ),
  };

  return handlers[action.type] ? handlers[action.type]() : state;
};
