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
const GET_USERS = "user/GET_USERS"

// 3.initial state
const initialState = {
  users: []
}
// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

//5. action creators
function getUsers() {
  return dispatch => {
    axios.get("/users").then(resp => {
      dispatch({
        type: GET_USERS,
        payload: resp.data
      })
    })
  }
}

function addUser(name) {
  return dispatch => {
    axios.post("/users", { name }).then(resp => {
      dispatch(getUsers())
    })
  }
}

function deleteUser(id) {
  return dispatch => {
    axios.delete("./users/" + id).then(resp => {
      dispatch(getUsers())
    })
  }
}
//6. custom hooks
export function useUsers() {
  const dispatch = useDispatch()
  const users = useSelector(appState => appState.userState.users)
  const add = user => dispatch(addUser(user))
  const del = userId => dispatch(deleteUser(userId))

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  return { users, add, del }
}
