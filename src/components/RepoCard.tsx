import { langIconMaker } from "../logic"
import type { GithubRepo } from "../types"

type Props = {
  repo: GithubRepo
}

function RepoCard(props: Props) {
  const { repo } = props
  // Mejorar el formateo
  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  // Quizas sacar a componente aparte
  const compactStat = (stat: { name: string, value?: number, icon: string }) => {
    return (
      <>
        <dt className="order-1 pb-1 border-b border-slate-300">{ stat.name }</dt>
        <dd className='flex items-center justify-center gap-2 order-2 ' title={ stat.name }>
          <i className={ stat.icon } />
          <span> { stat.value } </span>
        </dd>
      </>
    )
  }

  const compactStats = () => {
    return (<dl className="grid grid-rows-2 grid-cols-3 gap-2 mb-2 text-center">
      {compactStat({ name: 'Stars', value: repo.stargazers_count, icon: 'i-ic:round-star' })}
      {compactStat({ name: 'Seguidores', value: repo.watchers_count, icon: 'i-ic:round-remove-red-eye' })}
      {compactStat({ name: 'Issues', value: repo.open_issues_count, icon: 'i-ic:round-merge-type' })}
    </dl>)
  }
  // Juntare con el de abajo
  const badgeMaker = (language: string) => {
    const iconString = langIconMaker(language);

    return (
      <div className="w-12 h-12 p-1 -top-2 -right-2 rounded-lg shadow absolute bg-gray-200 dark:bg-gray-600">
        <i className={`${iconString} w-10 h-10 rounded`} />
      </div>
    );
  }
  const langMaker = () => {
    return badgeMaker(repo.language || 'none')
  }
  const avatarMaker = () => {
    return (
      <div className="w-12 h-12 -top-2 -left-2 rounded-full shadow absolute bg-indigo-200 dark:bg-indigo-600 overflow-hidden">
        <img src={repo.owner.avatar_url} alt={repo.owner.name} />
      </div>
    );
  }

  return (
    <article className="rounded bg-slate-200 dark:bg-slate-800 dark:text-slate-200 shadow dark:shadow-none border border-transparent dark:border-gray-400 p-2 relative">
      <h2 className='text-2xl mx-auto flex items-center justify-center font-bold mb-3 truncate max-w-[20ch]'>
        <i className={repo.private ? 'i-ic:round-lock' : 'hidden'} title={repo.private ? 'Privado' : 'Publico'} />
        { repo.is_template  && <i className='i-ic:round-copy-all' title="Es un template"/>}
        <span>{ repo.name }</span>
      </h2>
        {avatarMaker()}
        {langMaker()}
        {compactStats()}
      <div className="text-right text-sm mr-4">
        <p>Creado el {formatDate(repo?.created_at)}</p>
        <p>Ultima modificacion el {formatDate(repo?.updated_at)}</p>
        <p>Ultimo push el {formatDate(repo?.pushed_at)}</p>
      </div>
      <a href={repo?.html_url} target="_blank" className="inline-block w-full text-center mt-3">
        <button className="rounded bg-teal-500 shadow-sm px-3 py-1 text-slate-100 inline-flex items-center gap-2">
          <i className='i-ic:twotone-open-in-new' />
          <span> Ir al Repo </span>
        </button>
      </a>
    </article>
  )
}

export default RepoCard
