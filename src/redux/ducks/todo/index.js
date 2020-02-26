// export all reducers from this file
/*
  ex:

  export { deafult as userState } from './users'

  were './users' is a duck
*/
/*
1. imports
2. action definitions
3. initial state
4. reducer (default export)
5. action creators
6. custom hook (named export)
*/

// 1.imports
import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2.action definitions
const GET_TODOS = "user/GET_TODOS"

// 3.initial state
const initialState = {
  todos: []
}
// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload }
    default:
      return state
  }
}

//5. action creators
function getTodos() {
  return dispatch => {
    axios.get("/todos").then(resp => {
      dispatch({
        type: GET_TODOS,
        payload: resp.data
      })
    })
  }
}

function addTodo(item) {
  return dispatch => {
    axios.post("/todos", { item }).then(resp => {
      dispatch(getTodos())
    })
  }
}

function deleteTodo(id) {
  return dispatch => {
    axios.delete("./todos/" + id).then(resp => {
      dispatch(getTodos())
    })
  }
}
//6. custom hooks
export function useTodos() {
  const dispatch = useDispatch()
  const todos = useSelector(appState => appState.todoState.todos)
  const add = todo => dispatch(addTodo(todo))
  const del = todoId => dispatch(deleteTodo(todoId))

  useEffect(() => {
    dispatch(getTodos())
  }, [])
  return { todos, add, del }
}
