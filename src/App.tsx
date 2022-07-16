import { useState } from 'react'
import Layout from './components/Layout'
import Profiles from './pages/Profiles'
import Repos from './pages/Repos'
import { useDarkMode } from './hooks/useDarkMode'

export const PAGES = {
  PROJECTS: 'projects',
  USER: 'user',
}

function App() {
  const [mode, toggleMode] = useDarkMode()
  const [page, setPage] = useState(PAGES.PROJECTS);

  return (
    <Layout mode={mode} toggleMode={toggleMode} setPage={setPage}>
      {
        page === PAGES.PROJECTS && <Repos />
      }
      {
        page === PAGES.USER && <Profiles />
      }
    </Layout>
  )
}

export default App
