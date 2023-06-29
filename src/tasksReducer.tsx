import { ADD, DELETE, CHANGED } from "./constants";

export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case ADD: {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case CHANGED: {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case DELETE: {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("未知 action：" + action.type);
    }
  }
}
