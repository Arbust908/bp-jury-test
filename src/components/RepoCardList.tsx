import RepoCard from './RepoCard'
import type { GithubRepo } from '../types'

type Props = {
  repos?: GithubRepo[],
  loading?: boolean,
  error?: Error | null
}

function RepoCardList(props: Props) {
  const { repos, loading, error } = props

  const loadingBox = () => {
    return (
      <section className='flex justify-center items-center p-6 space-y-4 col-span-full'>
        <p className='text-2xl text-teal-500 font-bold'>Loading repos...</p>
      </section>
    )
  }
  const errorBox = () => {
    return (
      <section className='flex justify-center items-center p-6 space-y-4 col-span-full'>
        <p className='text-2xl text-red-500 font-bold'>{ error?.message }</p>
      </section>
    )
  }

  return (<>
    {loading && !error && loadingBox()}
    {error && errorBox()}
    <section className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {
        repos && repos.length === 0 &&
        <p className='text-center text-2xl text-gray-500 font-bold'>No repos found</p>
      }
      {
        repos && repos.length && repos.map(repo => <RepoCard repo={repo} key={repo.id} />)
      }
    </section>
  </>)
}

export { RepoCardList }
