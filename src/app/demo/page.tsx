'use client';

import React, { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import tasksReducer from './tasksReducer';
import { TaskActionType } from './constants';
import Counter from './counter-example';
import TodoList from './todo-list';

import styles from './page.module.css';


let nextId = 3;
/**
 * 初始值
 */
const initialTasks: TaskObject[] = [
  { id: 0, text: '劈材', done: true },
  { id: 1, text: '喂马', done: false },
  { id: 2, text: '环游世界', done: false }
];


export default function Demo() {

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: TaskActionType.ADD,
      id: nextId++,
      text: text
    });
  }

  function handleChangeTask(task: TaskObject) {
    dispatch({
      type: TaskActionType.CHANGED,
      task: task
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: TaskActionType.DELETE,
      id: taskId
    });
  }

  return (<div className={styles.demo}>
    <h1>日程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChange={handleChangeTask}
        onDelete={handleDeleteTask}
      />
      <Counter />
      <TodoList />
  </div>)
};