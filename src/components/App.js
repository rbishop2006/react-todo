import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import Users from "./Users"
import Form from "./Form.js"

export default props => {
  return (
    <Provider store={store}>
      <div>
        <Users />
        <Form />
      </div>
    </Provider>
  )
}
