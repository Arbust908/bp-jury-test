import RepoCard from './RepoCard'
import type { GithubRepo } from '../types'

type Props = {
  repos: GithubRepo[],
  loading?: boolean,
  error?: Error | null
}

function RepoCardList(props: Props) {
  const { repos, loading, error } = props

  const renderBox = (msgNode: React.ReactNode) => {
    return (
      <section className='flex justify-center items-center p-6 space-y-4 col-span-full'>
        { msgNode }
      </section>
    );
  }
  const loadingBox = () => {
    return renderBox(<p className='text-2xl text-teal-500 font-bold'>Loading repos...</p>);
  }
  const errorBox = () => {
    return renderBox(<p className='text-2xl text-red-500 font-bold'>{ error?.message }</p>);
  }
  const emptyBox = () => {
    return renderBox(<p className='text-2xl text-gray-500 font-bold'>No repos found</p>);
  }

  const renderList = () => {
    if (error) return errorBox()
    if (repos && !!repos.length) {
      return (<section className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <p className='col-span-full text-sm opacity-75 text-right'>
          {`${repos.length} repos encontrados`}
        </p>
        {
           repos.map(repo => <RepoCard repo={repo} key={repo.id} />)
        }
      </section>)
    } else if (loading) {
      return loadingBox()
    } else {
      return emptyBox()
    }
  }

  return renderList()
}

export { RepoCardList }
