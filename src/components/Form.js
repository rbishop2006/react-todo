import React, { useState, useRef } from "react"
import { useTodos } from "../hooks"

export default props => {
  const [item, setItem] = useState("")
  const { add } = useTodos()
  const inputEl = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()

    add(item)
    setItem("")
    inputEl.current.focus()
  }

  return (
    <div className="outerWrapperTop">
      <form className="wrapper" onSubmit={handleSubmit}>
        {/* <label>item</label> */}
        <h6>todos </h6>
        <div className="itemField">
          <input
            ref={inputEl}
            type="text"
            placeholder="What needs to be done?"
            onChange={e => setItem(e.target.value)}
            value={item}
          />
          {/* <button type="submit">Submit</button> */}
        </div>
      </form>
    </div>
  )
}
