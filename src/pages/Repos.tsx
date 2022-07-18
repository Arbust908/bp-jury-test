import { useState, useEffect } from 'react'
import { RepoCardList } from '../components/RepoCardList'
import { LanguageChart } from '../components/LanguageChart'
import { useFetchGithubRepos } from '../hooks/useFetchGithubRepos'
import type { Lang } from '../types'

const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;

function Repos() {
  const { repos, loading: reposLoading, error: reposError } = useFetchGithubRepos(GH_TOKEN, { per_page: 100 })
  const [languages, setLanguages] = useState<Lang[]>([])

  useEffect(() => {
    // *** Mejorar la repeticion
    if (repos && repos.length) {
      const langs = repos.reduce((acc, repo) => {
        if (repo.language) {
          const found_lang = acc.find(lang => lang.name === repo.language)
          console.log(found_lang)
          if (!found_lang) {
            console.log(`new lang ${repo.language}`)
            acc.push({
              name: repo.language,
              value: 1
            } as Lang)
          } else {
            found_lang.value++
          }
        } else {
          const has_other = acc.find(lang => lang.name === 'Others')
          if (!has_other) {
            acc.push({
              name: 'Others',
              value: 1
            } as Lang)
          } else {
            has_other.value++
          }
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
