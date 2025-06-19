import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './task.module.css';

interface TaskProps {
  task: TaskObject;
  onChange: (task: TaskObject) => void;
  onDelete: (taskId: number) => void;
}
function Task({ task, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value
            });
          }}
          placeholder='请输入任务内容'
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={() => setIsEditing(false)}>保存</button>
      </>
    );
  } else {
    taskContent = (
      <div className="flex py-2">
        {task.text || '空'}
        <button onClick={() => setIsEditing(true)} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">编辑</button>
      </div>
    );
  }
  return (
    <label className={classNames(styles.item, "mb-4 group flex gap-2")}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">删除</button>
    </label>
  );
}

interface TaskListProps {
  tasks: TaskObject[];
  onChange: (task: TaskObject) => void;
  onDelete: (taskId: number) => void;
}
export default function TaskList({ tasks, onChange, onDelete }: TaskListProps) {
  return (
    <ul className="mt-4">
      {tasks.map((task: TaskObject) => (
        <li key={task.id}>
          <Task task={task} onChange={onChange} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
