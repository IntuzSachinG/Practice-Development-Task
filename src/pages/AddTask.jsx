import  { useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; 
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm'; 
import '../pages/AddTask.css'; 

const AddTask = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch({ type: 'ADD_TASK', task: { ...values, id: uuid() } });
    navigate('/');
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
    />
  );
};

export default AddTask;
