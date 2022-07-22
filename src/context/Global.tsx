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
interface GlobalAction {
  type: string
  payload?: any
}

function reducer(actualState: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case "SET_USER":
      return { ...actualState, user: action.payload }
    case "SET_USERS":
      return { ...actualState, users: action.payload }
    case "SET_REPOS":
      return { ...actualState, repos: action.payload }
    case "TOGGLE_LOADING":
      return { ...actualState, isLoading: !actualState.isLoading }
    case "SET_ERROR":
      return { ...actualState, error: action.payload }
    case "TOGGLE_MODE":
      return { ...actualState, mode: actualState.mode === "light" ? "dark" : "light" }
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
  // setUsers: (users: GithubUser[]) => void
  // setRepos: (repos: GithubRepo[]) => void
  // setIsLoading: (isLoading: boolean) => void
  // setError: (error: any) => void
  toggleMode: () => void
}

type Context = {
  state: GlobalState,
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
    dispatch({ type: "SET_USER", payload: user })
  }

  const fullContext = {
    state,
    mode,
    toggleMode,
    setUser,
  }
  
  return (
    <GlobalContext.Provider value={ fullContext }>
      {children}
    </GlobalContext.Provider>
  )
}