import { useFormik } from "formik";
import * as Yup from "yup";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TASK_PRIORITY,
  TASK_STATUS,
} from "../utils/constants";

// !! Reusable form component for add the task and props
const TaskForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Add Task",
}) => {
  // !! Initialize Formik
  const taskForm = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      priority: TASK_PRIORITY.LOW,
      status: TASK_STATUS.PENDING,
    },

    // !! Default validation rules
    validationSchema:
      validationSchema ||
      Yup.object({
        title: Yup.string()
          .min(3, "Title must be at least 3 characters")
          .required("Title is required"),
        description: Yup.string()
          .min(5, "Description must be at least 5 characters")
          .required("Description is required"),
      }),
    onSubmit,
  });

  return (
    <form onSubmit={taskForm.handleSubmit} className="add-task-form">
      {/* !!  Task title */}
      <input
        name="title"
        placeholder="Title"
        onChange={taskForm.handleChange}
        onBlur={taskForm.handleBlur}
        value={taskForm.values.title}
      />

      {/* !!  Title validation error */}
      {taskForm.touched.title && taskForm.errors.title && (
        <div className="error-message">{taskForm.errors.title}</div>
      )}

      {/* !!  Task description */}
      <textarea
        name="description"
        placeholder="Description"
        onChange={taskForm.handleChange}
        onBlur={taskForm.handleBlur}
        value={taskForm.values.description}
      />

      {/* !!  Description validation error */}

      {taskForm.touched.description && taskForm.errors.description && (
        <div className="error-message">{taskForm.errors.description}</div>
      )}

      {/* !!  Priority selector */}
      <select
        name="priority"
        onChange={taskForm.handleChange}
        value={taskForm.values.priority}
      >
        {PRIORITY_OPTIONS.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      {/* !! Status selector */}
      <select
        name="status"
        onChange={taskForm.handleChange}
        value={taskForm.values.status}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default TaskForm;
