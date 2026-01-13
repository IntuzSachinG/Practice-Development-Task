import TaskItem from "../components/TaskItem";

const TaskList = ({ tasks }) => {
  return tasks.map((task) => <TaskItem key={task.id} task={task} />);
};

export default TaskList;
