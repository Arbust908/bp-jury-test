import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Profiles from './pages/Profiles'
import Repos from './pages/Repos'
import { NotFound } from './pages/NotFound'
import { useDarkMode } from './hooks/useDarkMode'
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
          <Route path="/" element={<h1> Home </h1>} />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Layout>
    </GlobalProvider>
  )
}

export default App
