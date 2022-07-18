import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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

  return (
    <Layout mode={mode} toggleMode={toggleMode}>
      <Routes>
        <Route path="/projects" element={<Repos />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/" element={<h1> Home </h1>} />
      </Routes>
    </Layout>
  )
}

export default App
