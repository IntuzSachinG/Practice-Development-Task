import { useContext, useMemo, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskList from "../components/TaskList";
import { TASK_PRIORITY, TASK_STATUS } from "../utils/constants";
import "../pages/Dashboard.css";

const Dashboard = () => {
  // !! Get tasks from global context
  const { tasks } = useContext(TaskContext);

  // !! Selected priority filter (All | Low | Medium | High)
  const [priorityFilter, setPriorityFilter] = useState("All");

  // !! Count completed tasks
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === TASK_STATUS.COMPLETED),
    [tasks]
  );

  // !! Count in-progress tasks
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS),
    [tasks]
  );

  // !! Count pending tasks
  const pendingTasks = useMemo(
    () => tasks.filter((task) => task.status === TASK_STATUS.PENDING),
    [tasks]
  );

  const filteredAndSortedTasks = useMemo(() => {
    // !! Define priority order for sorting
    const priorityOrder = {
      [TASK_PRIORITY.LOW]: 1,
      [TASK_PRIORITY.MEDIUM]: 2,
      [TASK_PRIORITY.HIGH]: 3,
    };

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
        <label>Filter by Priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          {Object.values(TASK_PRIORITY).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* !! Task list */}
      <TaskList tasks={filteredAndSortedTasks} />

      <h1>Completed Tasks: {completedTasks.length}</h1>
      <h2>Progress Tasks: {inProgressTasks.length}</h2>
      <h3>Pending Tasks: {pendingTasks.length}</h3>
    </div>
  );
};

export default Dashboard;
