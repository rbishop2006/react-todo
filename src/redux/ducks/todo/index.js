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
const GET_TODOS = "todo/GET_TODOS"
const SET_COUNT = "todo/SET_COUNT"

// 3.initial state
const initialState = {
  todos: [],
  count: 0
}
// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload }
    case SET_COUNT:
      return { ...state, count: action.payload }
    default:
      return state
  }
}

//5. action creators
function getTodos() {
  return dispatch => {
    axios.get("/todos").then(resp => {
      dispatch(getCount())
      dispatch({
        type: GET_TODOS,
        payload: resp.data
      })
    })
  }
}

function addTodo(item) {
  return dispatch => {
    axios.post("/todos", { item, status: "active" }).then(resp => {
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

function toggleTodo(id) {
  return dispatch => {
    axios.get("/todos/" + id).then(resp => {
      const todo = resp.data
      if (todo.status === "completed") {
        axios.patch("/todos/" + id, { status: "active" }).then(resp => {
          dispatch(getTodos())
        })
      } else {
        axios.patch("/todos/" + id, { status: "completed" }).then(resp => {
          dispatch(getTodos())
        })
      }
    })
  }
}

function filterTodos(filter) {
  return dispatch => {
    let query = ""

    if (filter === "all") {
      query = ""
    } else if (filter === "completed") {
      query = "?status=completed"
    } else if (filter === "active") {
      query = "?status=active"
    }

    axios.get(`/todos/${query}`).then(resp => {
      dispatch({
        type: GET_TODOS,
        payload: resp.data
      })
      dispatch(getCount())
    })
  }
}

function clearTodos() {
  return dispatch => {
    axios.get("/todos?status=completed").then(resp => {
      Promise.all(
        resp.data.map(
          todo =>
            new Promise((resolve, reject) => {
              axios.delete("/todos/" + todo.id).then(resp => {
                resolve()
              })
            })
        )
      ).then(values => {
        dispatch(getTodos())
      })
    })
  }
}

function getCount() {
  return dispatch => {
    axios.get("/todos?status=active").then(resp => {
      dispatch({
        type: SET_COUNT,
        payload: resp.data.length
      })
    })
  }
}

//6. custom hooks
export function useTodos() {
  const dispatch = useDispatch()
  const todos = useSelector(appState => appState.todoState.todos)
  const count = useSelector(appState => appState.todoState.count)
  const add = todo => dispatch(addTodo(todo))
  const del = todoId => dispatch(deleteTodo(todoId))
  const toggle = id => dispatch(toggleTodo(id))

  const filter = filter => dispatch(filterTodos(filter))
  const clear = () => dispatch(clearTodos())

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  return { todos, add, del, toggle, count, filter, clear }
}
