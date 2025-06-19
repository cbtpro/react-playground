import { TaskActionType } from "./constants";
import { assertNever } from './utils/assertNever';

export type Action =
  | { type: TaskActionType.ADD; id: number; text: string }
  | { type: TaskActionType.CHANGED; task: TaskObject }
  | { type: TaskActionType.DELETE; id: number }
  // | { type: TaskActionType.DISABLED; id: number }
export default function tasksReducer(tasks: TaskObject[], action: Action) {
  switch (action.type) {
    default:
      // 这里的 action 会被推断为 never
      return assertNever(action, '未知 action');
    case TaskActionType.ADD:
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    case TaskActionType.CHANGED:
      return tasks.map((t: TaskObject) => {
        if (t.id === action?.task?.id) {
          return action.task;
        } else {
          return t;
        }
      });
    case TaskActionType.DELETE:
      return tasks.filter((t: TaskObject) => t.id !== action.id);
  }
}
