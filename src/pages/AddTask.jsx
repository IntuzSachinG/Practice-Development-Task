import { useContext, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import "../pages/AddTask.css";

const AddTask = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate();
  const titleRef = useRef();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "Low",
      status: "Pending",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
      description: Yup.string()
        .min(5, "Description must be at least 5 characters")
        .required("Description is required"),
    }),
    onSubmit: (values) => {
      dispatch({ type: "ADD_TASK", task: { ...values, id: uuid() } });
      navigate("/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="add-task-form">
      <h2>Add Task</h2>
      <input
        ref={titleRef}
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

export default AddTask;
