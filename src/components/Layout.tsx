import { PAGES } from '../App'

type Props = {
  children: React.ReactNode
  mode: 'dark' | 'light',
  toggleMode: () => void,
  setPage: (page: string) => void
}

function Layout(props: Props) {
  const { children, mode, toggleMode, setPage } = props
  return (
    <div className='w-full h-full bg-slate-100 dark:bg-slate-900 flex'>
      <nav className='max-w-[200px] w-full h-full bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-4 py-6'>
        <h1 className='text-2xl font-black uppercase text-teal-600'>Jury</h1>
        <button
          onClick={toggleMode}
          className="border-none bg-transparent text-slate-600 dark:text-slate-400 cursor-pointer text-4xl"
        >
          <i className={`${mode === 'dark' ? 'i-ic:round-toggle-off' : 'i-ic:round-toggle-on'}`} />
          <i className={`${mode === 'dark' ? 'i-ic:round-wb-sunny' : 'i-ic:round-shield-moon'}`} />
        </button>
        <ul className='list-none m-0 px-0 py-2 space-y-2'>
          <li className='cursor-pointer hover:bg-teal-500' onClick={() => {setPage(PAGES.PROJECTS)}}>
            Projectos
          </li>
          <li className='cursor-pointer hover:bg-teal-500' onClick={() => {setPage(PAGES.USER)}}>
            User
          </li>
        </ul>
      </nav>
      <main className='w-full h-full p-8 flex flex-col gap-4 overflow-y-scroll'>
        {children}
      </main>
    </div>
  )
}

export default Layout
