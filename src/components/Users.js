import React from "react"
import { useUsers } from "../hooks"

export default props => {
  const { users, del } = useUsers()

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <p>
          {user.id}: {user.name}
          <button onClick={e => del(user.id)}>Delete</button>
        </p>
      ))}
    </div>
  )
}
