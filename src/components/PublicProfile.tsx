import { GithubUser } from '../types'

type Props = {
  user: GithubUser | null
  error?: Error | null
  loading?: boolean
}

function PublicProfile(props: Props) {
  const { user, error, loading } = props

  return (
    <article
      className="rounded shadow-sm mx-auto my-2 max-w-md py-4 px-6 bg-slate-200 hover:shadow-lg dark:shadow-slate-300 dark:bg-slate-800 dark:text-slate-200 space-y-2 w-220px"
    >
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {user && <>
        <a href={user.html_url} className="hover:text-teal-600 font-bold">
          <h2 className="flex items-center justify-center gap-3">
            <img src={user.avatar_url} alt={user.name} width="32" height="32" className="rounded-full shadow" />
            <span>
              {user.name}
            </span>
          </h2>
        </a>
        <p className='text-center text-sm font-bold'>{user.location}</p>
        <p className='text-center'>
          <a href={user.blog}> Blog </a>
        </p>
        <p className='text-center'>
          <i className={user.hireable ? 'i-ic:outline-work-outline' : 'i-ic:outline-work-off'} />
          <span className='pl-2'>
            { !user.hireable && 'Not-' }Hireable
          </span>
        </p>
        <p className='flex justify-between items-center'>
          <i className="i-ic:outline-supervised-user-circle"></i>
          <span>Followers: {user.followers}</span>
        </p>
        <p className='flex justify-between items-center'>
          <i className="i-ic:outline-diversity-1"></i>
          Following: {user.following}
        </p>
        <p className='flex justify-between items-center'>
          <i className="i-ic:outline-account-tree"></i>
          Repos: {user.public_repos}
        </p>
        <p className='flex justify-between items-center'>
          <i className="i-ic:outline-code"></i>
          Gists: {user.public_gists}
        </p>
        <p className='text-sm opacity-75 text-right' >Started: { new Date(user.created_at).toLocaleDateString() }</p>
        <p className='text-sm opacity-75 text-right' >Last update: {new Date(user.updated_at).toLocaleDateString()}</p>
      </>}
    </article>
  )
}

export default PublicProfile
