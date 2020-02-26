import React from "react"
import { useTodos } from "../hooks"
import "../styles/app.css"

export default props => {
  const { todos, del } = useTodos()

  return (
    <div className="outerWrapperBottom">
      <div className="wrapper">
        {todos.map(todo => (
          <div className="itemFlex">
            <p className="todoItems">
              <input className="radioButton" type="radio" />
              item {todo.id}: {todo.item}
            </p>
            <button className="delete" onClick={e => del(todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
