// !! Here in this file i remove manual state handling in Taskitem

import { useCallback, useContext, useReducer } from "react";
import { TaskContext } from "../contexts/TaskContext";
import {
  TASK_STATUS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  ACTION_TYPES,
} from "../utils/constants";

// !! Local reducer state for editing mode
const initialState = {
  isEditing: false,
  editTitle: "",
  editDescription: "",
};

// !! Handles edit mode state transitions
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

// !!  Single task card component
const TaskItem = ({ task }) => {
  // ??  Global task dispatcher
  const { dispatch } = useContext(TaskContext);
  // ??   Local reducer for edit mode
  const [editState, dispatchEdit] = useReducer(taskEditReducer, initialState);

  // ??  Start editing task
  const startEditing = useCallback(() => {
    dispatchEdit({
      type: "START_EDIT",
      payload: { title: task.title, description: task.description },
    });
  }, [task.title, task.description]);

  // ??  Save edited task
  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: ACTION_TYPES.UPDATE_TASK,
      task: {
        id: task.id,
        title: editState.editTitle,
        description: editState.editDescription,
      },
    });

    dispatchEdit({ type: "SAVE_EDIT" });
  };

  // ?? Change priority
  const changePriority = useCallback(
    (priority) => {
      dispatch({
        type: ACTION_TYPES.TOGGLE_PRIORITY,
        id: task.id,
        priority,
      });
    },
    [dispatch, task.id]
  );

  // ??  Change status
  const changeStatus = useCallback(
    (status) => {
      dispatch({
        type: ACTION_TYPES.TOGGLE_STATUS,
        id: task.id,
        status,
      });
    },
    [dispatch, task.id]
  );

  return (
    <div
      className={`task-item ${
        task.status === TASK_STATUS.COMPLETED
          ? "completed"
          : task.status === TASK_STATUS.PENDING
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
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={task.priority}
            onChange={(e) => changePriority(e.target.value)}
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              dispatch({ type: ACTION_TYPES.DELETE_TASK, id: task.id })
            }
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
