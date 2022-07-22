import { createContext, useReducer, useEffect } from "react"
import { useDarkMode } from "../hooks/useDarkMode";
import { useFetchGithubRepos } from "../hooks/useFetchGithubRepos";
import { useLanguage } from '../hooks/useLanguage'
import { GithubUser, GithubRepo, Lang } from "../types"

const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;
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
  setRepos: (repos: GithubRepo[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: any) => void
  toggleMode: () => void
  getRepos: () => void
}

type Context = {
  mode: "light" | "dark",
  languages: Lang[],
} & ContextActions & GlobalState

export const GlobalContext = createContext({} as Context );

type GlobalProviderProps = {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { repos: newRepos, loading, error, getRepos } = useFetchGithubRepos(GH_TOKEN, { per_page: 100 })
  const { languages } = useLanguage(state.repos);
  const [mode, toggleMode] = useDarkMode();

  const setUser = (user: GithubUser) => {
    dispatch({ type: GlobalActionType.SET_USER, payload: user })
  }
  const setUsers = (users: GithubUser[]) => {
    dispatch({ type: GlobalActionType.SET_USERS, payload: users })
  }
  const setRepos = (repos: GithubRepo[]) => {
    dispatch({ type: GlobalActionType.SET_REPOS, payload: repos })
  }
  const setIsLoading = (isLoading: boolean) => {
    dispatch({ type: GlobalActionType.TOGGLE_LOADING, payload: isLoading })
  }
  const setError = (error: any) => {
    dispatch({ type: GlobalActionType.SET_ERROR, payload: error })
  }

  useEffect(() => {
    dispatch({ type: GlobalActionType.SET_REPOS, payload: newRepos })
  }, [newRepos])
  useEffect(() => {
    dispatch({ type: GlobalActionType.TOGGLE_LOADING, payload: loading })
  }, [loading])
  useEffect(() => {
    dispatch({ type: GlobalActionType.SET_ERROR, payload: error })
  }, [error])

  const fullContext = {
    ...state,
    mode,
    languages,
    toggleMode,
    setUser,
    setUsers,
    setRepos,
    setIsLoading,
    setError,
    getRepos,
  }
  
  return (
    <GlobalContext.Provider value={ fullContext }>
      {children}
    </GlobalContext.Provider>
  )
}