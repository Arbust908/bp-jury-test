import { createContext, useState } from "react"
import { useDarkMode } from "../hooks/useDarkMode";
import { GithubUser, GithubRepo } from "../types"

export const GlobalContext = createContext({
  mode: "light",
  toggleMode: () => { },
  repos: [] as GithubRepo[],
  setRepos: () => { },
  users: [] as GithubUser[],
  setUsers: () => { },
});

type GlobalProviderProps = {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [mode, toggleMode] = useDarkMode()
  const [repos, setRepos] = useState([]);
  const [users, setUsers] = useState([]);
  
  return (
    <GlobalContext.Provider value={{
      mode,
      toggleMode,
      repos,
      setRepos,
      users,
      setUsers,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}