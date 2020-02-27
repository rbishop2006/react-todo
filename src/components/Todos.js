import React, { useState } from "react"
import { useTodos } from "../hooks"
import "../styles/app.css"
import { TiDeleteOutline } from "react-icons/ti"

export default props => {
  const { todos, del, toggle, count, filter, clear } = useTodos()
  const [view, setView] = useState("all")

  function changeView(status) {
    setView(status)
    filter(status)
  }

  return (
    <div className="outerWrapperBottom">
      <div className="wrapper">
        {todos.map(todo => (
          <div key={"todo" + todo.id}>
            <label htmlFor="checkBox"></label>
            <div className="itemFlex">
              <input
                className="checkBox"
                onClick={e => toggle(todo.id)}
                type="checkbox"
              />
              <p
                key={"todo" + todo.id}
                id="itemsTodo"
                className={todo.status === "completed" ? "completed" : ""}
                // onClick={e => toggle(todo.id)}
              >
                {todo.item}
              </p>
              <button className="delete" onClick={e => del(todo.id)}>
                <TiDeleteOutline className="iconDelete" />
              </button>
            </div>
          </div>
        ))}
        <div className="footer">
          <div>
            <p>Items left: {count}</p>
          </div>
          <div>
            <label htmlFor="all">All</label>
            <input
              checked={view === "all" ? true : false}
              onChange={e => changeView("all")}
              name="view"
              id="all"
              type="radio"
            />
            <label htmlFor="active">Active</label>
            <input
              checked={view === "active" ? true : false}
              onChange={e => changeView("active")}
              name="view"
              id="active"
              type="radio"
            />
            <label htmlFor="completed">Completed</label>
            <input
              checked={view === "completed" ? true : false}
              onChange={e => changeView("completed")}
              name="view"
              id="completed"
              type="radio"
            />
          </div>
          <div>
            <button onClick={e => clear()}>Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  )
}
