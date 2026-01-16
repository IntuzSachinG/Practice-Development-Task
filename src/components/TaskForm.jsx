import { useFormik } from "formik";
import * as Yup from "yup";

const TaskForm = ({ initialValues, validationSchema, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      priority: "Low",
      status: "Pending",
    },
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
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="add-task-form">
      
      <input
        name="title"
        placeholder="Title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="error-message">{formik.errors.title}</div>
      ) : null}

      <textarea
        name="description"
        placeholder="Description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
      {formik.touched.description && formik.errors.description ? (
        <div className="error-message">{formik.errors.description}</div>
      ) : null}

      <select
        name="priority"
        onChange={formik.handleChange}
        value={formik.values.priority}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        name="status"
        onChange={formik.handleChange}
        value={formik.values.status}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
