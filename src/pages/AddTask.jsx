import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { TaskContext } from "../contexts/TaskContext";
import TaskForm from "../components/TaskForm";
import { TASK_PRIORITY, TASK_STATUS, ACTION_TYPES } from "../utils/constants";
import "./AddTask.css";

const AddTask = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleAddTask = (values) => {
    dispatch({
      type: ACTION_TYPES.ADD_TASK,
      task: { ...values, id: uuid() },
    });

    navigate("/");
  };

  return (
    <TaskForm
      initialValues={{
        title: "",
        description: "",
        priority: TASK_PRIORITY.LOW,
        status: TASK_STATUS.PENDING,
      }}
      onSubmit={handleAddTask}
      submitLabel="Add Task"
    />
  );
};

export default AddTask;
