import React, { useState } from 'react';
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
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>编辑</button>
      </>
    );
  }
  return (
    <label className={styles.item}>
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
      <button onClick={() => onDelete(task.id)}>删除</button>
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
    <ul>
      {tasks.map((task: TaskObject) => (
        <li key={task.id}>
          <Task task={task} onChange={onChange} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
