// !! Here in this file i remove manual state handling in Taskitem

import { useContext, useCallback, useReducer } from "react";
import { TaskContext } from "../context/TaskContext";

const initialState = {
  isEditing: false,
  editTitle: "",
  editDescription: "",
};

function taskEditReducer(state, action) {
  switch (action.type) {
    case "START_EDIT":
      return {
        isEditing: true,
        editTitle: action.payload.title,
        editDescription: action.payload.description,
      };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "CANCEL_EDIT":
    case "SAVE_EDIT":
      return initialState;
    default:
      return state;
  }
}

const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [editState, dispatchEdit] = useReducer(taskEditReducer, initialState);

  const startEditing = useCallback(() => {
    dispatchEdit({
      type: "START_EDIT",
      payload: { title: task.title, description: task.description },
    });
  }, [task.title, task.description]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_TASK",
      task: {
        id: task.id,
        title: editState.editTitle,
        description: editState.editDescription,
      },
    });
    dispatchEdit({ type: "SAVE_EDIT" });
  };

  const changePriority = useCallback(
    (priority) => {
      dispatch({ type: "TOGGLE_PRIORITY", id: task.id, priority });
    },
    [dispatch, task.id]
  );

  const changeStatus = useCallback(
    (status) => {
      dispatch({ type: "TOGGLE_STATUS", id: task.id, status });
    },
    [dispatch, task.id]
  );

  return (
    <div
      className={`task-item ${
        task.status === "Completed"
          ? "completed"
          : task.status === "Pending"
          ? "pending"
          : "in-progress"
      }`}
    >
      {editState.isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editState.editTitle}
            onChange={(e) =>
              dispatchEdit({
                type: "UPDATE_FIELD",
                field: "editTitle",
                value: e.target.value,
              })
            }
            required
          />
          <textarea
            value={editState.editDescription}
            onChange={(e) =>
              dispatchEdit({
                type: "UPDATE_FIELD",
                field: "editDescription",
                value: e.target.value,
              })
            }
            required
          />
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            onClick={() => dispatchEdit({ type: "CANCEL_EDIT" })}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>

          <select
            value={task.status}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={task.priority}
            onChange={(e) => changePriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            onClick={() => dispatch({ type: "DELETE_TASK", id: task.id })}
            className="delete-btn"
          >
            Delete
          </button>

          <button onClick={startEditing} className="edit-btn">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
