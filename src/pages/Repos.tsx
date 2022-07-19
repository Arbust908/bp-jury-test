import { useState, useEffect } from 'react'
import { RepoCardList } from '../components/RepoCardList'
import { LanguageChart } from '../components/LanguageChart'
import { useFetchGithubRepos } from '../hooks/useFetchGithubRepos'
import type { Lang } from '../types'
import { GlobalContext } from '../context/Global'

const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;

function Repos() {
  const { repos, loading: reposLoading, error: reposError } = useFetchGithubRepos(GH_TOKEN, { per_page: 100 })
  const [languages, setLanguages] = useState<Lang[]>([])

  useEffect(() => {
    if (repos && repos.length) {
      const langs = repos.reduce((acc, repo) => {
        let found = null;
        if (repo.language) {
          found = acc.find(lang => lang.name === repo.language)
        } else {
          found = acc.find(lang => lang.name === 'Others')
        }
        if (!found) {
          const name = repo.language ? repo.language : 'Others';
          acc.push({
            name,
            value: 1
          } as Lang)
        } else {
          found.value++
        }
        return acc
      }, [] as Lang[])
      setLanguages(langs);
    }
  }, [repos])

  return (
    <>
      {
        languages.length > 0 &&
        <section className='flex flex-col space-y-4 col-span-full'>
          <LanguageChart languages={languages} />
        </section>
      }
      <RepoCardList repos={repos} loading={reposLoading} error={reposError} />
    </>
  )
}

export default Repos
