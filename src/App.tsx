import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import tasksReducer from './tasksReducer';
import { ADD, DELETE, CHANGED } from './constants';

let nextId = 3;
const initialTasks = [
  { id: 0, text: '劈材', done: true },
  { id: 1, text: '喂马', done: false },
  { id: 2, text: '环游世界', done: false }
];

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: ADD,
      id: nextId++,
      text: text
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: CHANGED,
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: DELETE,
      id: taskId
    });
  }

  return (
    <>
      <h1>日程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
