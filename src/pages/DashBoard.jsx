import { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import "../pages/DashBoard.css";

const Dashboard = () => {
  const { tasks } = useContext(TaskContext);
  const [priorityFilter, setPriorityFilter] = useState("All");

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "Completed"),
    [tasks]
  );

  const progressTasks = useMemo(
    () => tasks.filter((task) => task.status === "In Progress"),
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status === "Pending"),
    [tasks]
  );

  const filteredAndSortedTasks = useMemo(() => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };

    if (priorityFilter === "All") {
      return [...tasks].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    return [...tasks].sort((a, b) => {
      if (a.priority === priorityFilter) return -1;
      if (b.priority === priorityFilter) return 1;

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks, priorityFilter]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="filter-container">
        <label htmlFor="priority-filter">Filter by Priority: </label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <TaskList tasks={filteredAndSortedTasks} />
      <h1>Completed Tasks: {completedTasks.length}</h1>
      <h2>Progress Tasks: {progressTasks.length}</h2>
      <h3>Pending Tasks: {pendingTasks.length}</h3>
    </div>
  );
};

export default Dashboard;
