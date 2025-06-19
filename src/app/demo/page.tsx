'use client';

import React from 'react';
import classNames from 'classnames';
import TodoListDemo from './todo-list-demo';
import Counter from './counter-example';
import TodoList from './todo-list';

import styles from './page.module.css';

export default function Demo() {
  return (<div className={classNames(styles.demo, "flex flex-col gap-y-2")}>
      <TodoListDemo  />
      <Counter />
      <TodoList />
  </div>)
};