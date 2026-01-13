import { useContext, useCallback, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const changePriority = useCallback(
    (priority) => {
      dispatch({type:"TOGGLE_PRIORITY",id:task.id,priority})
    },
    [dispatch,task.id]
  );

  const changeStatus = useCallback(
    (status) => {
      dispatch({ type: "TOGGLE_STATUS", id: task.id, status });
    },
    [dispatch, task.id]
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_TASK",

      task: {
        id: task.id,
        title: editTitle,
        description: editDescription,
      },
    });
    setIsEditing(false);
  };

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
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
          />
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
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
          <p>Priority:{task.priority}</p>
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
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
