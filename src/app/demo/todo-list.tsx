"use client"

import type React from "react"

import { useReducer, useState } from "react"
import { Trash2, Check, Plus } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface State {
  todos: Todo[]
  nextId: number
}

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "CLEAR_COMPLETED" }

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.text,
            completed: false,
          },
        ],
        nextId: state.nextId + 1,
      }

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
      }

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      }

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }

    default:
      throw new Error(`Unknown action type`)
  }
}

const initialState: State = {
  todos: [],
  nextId: 1,
}

export default function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [inputText, setInputText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      dispatch({ type: "ADD_TODO", text: inputText.trim() })
      setInputText("")
    }
  }

  const completedCount = state.todos.filter((todo) => todo.completed).length

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2 mb-4">
        {state.todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-2 rounded ${todo.completed ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <button
              onClick={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
              className={`p-1 rounded ${
                todo.completed ? "text-green-600 bg-green-100" : "text-gray-400 hover:text-green-600"
              }`}
            >
              <Check size={16} />
            </button>

            <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
              {todo.text}
            </span>

            <button
              onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          {state.todos.length} total, {completedCount} completed
        </span>

        {completedCount > 0 && (
          <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })} className="text-red-500 hover:text-red-700">
            Clear completed
          </button>
        )}
      </div>
    </div>
  )
}
