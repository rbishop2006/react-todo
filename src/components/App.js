import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import Todos from "./Todos"
import Form from "./Form.js"

export default props => {
  return (
    <Provider store={store}>
      <div>
        <Form />
        <Todos />
      </div>
    </Provider>
  )
}
