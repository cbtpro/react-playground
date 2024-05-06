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
      return tasks.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case DELETE: {
      return tasks.filter((task) => {
        return task.id !== action.id;
      });
    }
    default: {
      throw Error("未知 action：" + action.type);
    }
  }
}
