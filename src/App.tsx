import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Profiles from './pages/Profiles'
import Repos from './pages/Repos'
import LogIn from './pages/LogIn'
import { NotFound } from './pages/NotFound'
import { GlobalProvider } from './context/Global'

export const PAGES = {
  PROJECTS: 'projects',
  USER: 'user',
}

function App() {
  return (
    <GlobalProvider>
      <Layout>
        <Routes>
          <Route path="/projects" element={<Repos />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<LogIn />} />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Layout>
    </GlobalProvider>
  )
}

export default App
