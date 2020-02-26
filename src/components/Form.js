import React, { useState } from "react"
import { useTodos } from "../hooks"

export default props => {
  const [item, setItem] = useState("")
  const { add } = useTodos()

  function handleSubmit(e) {
    e.preventDefault()

    add(item)
  }

  return (
    <div className="outerWrapperTop">
      <form className="wrapper" onSubmit={handleSubmit}>
        {/* <label>item</label> */}
        <h6>todos </h6>
        <div className="itemField">
          <input
            type="text"
            placeholder="What needs to be done?"
            onChange={e => setItem(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
