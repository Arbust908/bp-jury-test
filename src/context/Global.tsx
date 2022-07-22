import { createContext, useState, useReducer, useEffect } from "react"
import { useDarkMode } from "../hooks/useDarkMode";
import { GithubUser, GithubRepo } from "../types"

interface GlobalState {
  user: GithubUser | null
  repos: GithubRepo[]
  users: GithubUser[]
  isLoading: boolean
  error: any | null
  mode: "light" | "dark"
}
enum GlobalActionType {
  SET_USER = "SET_USER",
  SET_USERS = "SET_USERS",
  SET_REPOS = "SET_REPOS",
  TOGGLE_LOADING = "TOGGLE_LOADING",
  SET_ERROR = "SET_ERROR"
}
interface GlobalAction {
  type: GlobalActionType
  payload?: any
}

function reducer(actualState: GlobalState, action: GlobalAction): GlobalState {
  const { type, payload } = action
  const { SET_USER, SET_USERS, SET_REPOS, TOGGLE_LOADING, SET_ERROR } = GlobalActionType
  switch (type) {
    case SET_USER:
      return { ...actualState, user: payload }
    case SET_USERS:
      return { ...actualState, users: payload }
    case SET_REPOS:
      return { ...actualState, repos: payload }
    case TOGGLE_LOADING:
      return { ...actualState, isLoading: !actualState.isLoading }
    case SET_ERROR:
      return { ...actualState, error: payload }
    default:
      return actualState
  }
}

const initialState: GlobalState = {
  user: null,
  repos: [],
  isLoading: false,
  error: null,
  users: [],
  mode: "light",
}

interface ContextActions {
  setUser: (user: GithubUser) => void
  setUsers: (users: GithubUser[]) => void
  // setRepos: (repos: GithubRepo[]) => void
  // setIsLoading: (isLoading: boolean) => void
  // setError: (error: any) => void
  toggleMode: () => void
}

type Context = {
  state: GlobalState,
  users: GithubUser[],
  mode: "light" | "dark",
} & ContextActions

export const GlobalContext = createContext({} as Context );

type GlobalProviderProps = {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [mode, toggleMode] = useDarkMode();

  const setUser = (user: GithubUser) => {
    dispatch({ type: GlobalActionType.SET_USER, payload: user })
  }
  const setUsers = (users: GithubUser[]) => {
    dispatch({ type: GlobalActionType.SET_USERS, payload: users })
  }

  const fullContext = {
    state,
    users: state.users,
    mode,
    toggleMode,
    setUser,
    setUsers,
  }
  
  return (
    <GlobalContext.Provider value={ fullContext }>
      {children}
    </GlobalContext.Provider>
  )
}