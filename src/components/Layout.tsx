import { useContext } from 'react';
import { Link, useMatch } from 'react-router-dom'
import { GlobalContext } from '../context/Global';

type NavLinkProps = {
  children: React.ReactNode
  to: string
}

function NavLink({ children, to }: NavLinkProps) {
  const linkClasses = 'cursor-pointer hover:bg-teal-500 px-2 rounded font-bold hover:text-slate-100 hover:shadow w-full block'
  const isActive = useMatch(to)
  const selectionClasses = isActive ? 'bg-teal-500 text-slate-100' : ''

  return (
    <li>
      <Link className={`${linkClasses} ${selectionClasses}`} to={to}>
        { children }
      </Link>
    </li>)
}

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { mode, toggleMode } = useContext(GlobalContext);

  return (
    <div className='w-full h-full bg-slate-100 dark:bg-slate-900 flex'>
      <nav className='max-w-[200px] w-full h-full bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-4 py-6'>
        <Link to="/">
          <h1 className='text-2xl font-black uppercase text-teal-600'>
            Jury
          </h1>
        </Link>
        <button
          onClick={toggleMode}
          className="border-none bg-transparent text-slate-600 dark:text-slate-400 cursor-pointer text-4xl"
        >
          <i className={`${mode === 'dark' ? 'i-ic:round-toggle-off' : 'i-ic:round-toggle-on'}`} />
          <i className={`${mode === 'dark' ? 'i-ic:round-wb-sunny' : 'i-ic:round-nightlight'} icon-6`} />
        </button>
        <ul className='list-none m-0 px-0 py-2 space-y-2'>
          <NavLink to='/projects'>Projects</NavLink>
          <NavLink to='/profiles'>Profiles</NavLink>
        </ul>
      </nav>
      <main className='w-full h-full p-8 flex flex-col gap-4 overflow-y-scroll'>
        {children}
      </main>
    </div>
  )
}

export default Layout
