import React, { useState } from "react"
import { useUsers } from "../hooks"

export default props => {
  const [name, setName] = useState("")
  const { add } = useUsers()

  function handleSubmit(e) {
    e.preventDefault()

    add(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        placeholder="JSmith"
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
