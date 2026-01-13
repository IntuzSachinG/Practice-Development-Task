export const taskReducer = (state, action) => {
  const handlers = {
    ADD_TASK: (state, action) => [...state, action.task],
    UPDATE_TASK: (state, action) =>
      state.map((task) =>
        task.id === action.task.id
          ? {
              ...task,
              title: action.task.title,
              description: action.task.description,
            }
          : task
      ),
    DELETE_TASK: (state, action) =>
      state.filter((task) => task.id !== action.id),

    TOGGLE_PRIORITY: (state,action) => 
      state.map((task) => 
      task.id === action.id ? {...task,priority:action.priority} : task),

    TOGGLE_STATUS: (state, action) =>
      state.map((task) =>
        task.id === action.id ? { ...task, status: action.status } : task
      ),
  };

  const handler = handlers[action.type] || (() => state);

  return handler(state, action);
};
