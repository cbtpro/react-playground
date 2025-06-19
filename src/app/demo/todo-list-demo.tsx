
"use client"

import React, { useReducer } from 'react';
import classNames from 'classnames';
import AddTask from './AddTask';
import TaskList from './TaskList';
import tasksReducer from './tasksReducer';
import { TaskActionType } from './constants';

import styles from './todo-list-demo.module.css';

let nextId = 3;
/**
 * 初始值
 */
const initialTasks: TaskObject[] = [
  { id: 0, text: '劈材', done: true },
  { id: 1, text: '喂马', done: false },
  { id: 2, text: '环游世界', done: false }
];

export default function TodoListDemo() {

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

  return (
    <div className={classNames(styles.todoListDemo, "p-6 max-w-md mx-auto bg-white rounded-lg shadow-md")}>
      <h1 className="text-2xl font-bold mb-4">日程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChange={handleChangeTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
