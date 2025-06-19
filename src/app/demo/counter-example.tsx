"use client"

import { useReducer } from "react"

// Define the state shape
interface State {
  count: number
}

// Define action types
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" } | { type: "set"; payload: number }

// Reducer function - must be pure
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    case "reset":
      return { count: 0 }
    case "set":
      return { count: action.payload }
    default:
      throw new Error(`Unknown action type`)
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">计数器: {state.count}</h2>

      <div className="space-x-2">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +1
        </button>

        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -1
        </button>

        <button
          onClick={() => dispatch({ type: "reset" })}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重置
        </button>

        <button
          onClick={() => dispatch({ type: "set", payload: 10 })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          设为 10
        </button>
      </div>
    </div>
  )
}
