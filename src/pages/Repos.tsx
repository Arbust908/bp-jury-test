import { RepoCardList } from '../components/RepoCardList'
import { LanguageChart } from '../components/LanguageChart'
import { useFetchGithubRepos } from '../hooks/useFetchGithubRepos'
import { useLanguage } from '../hooks/useLanguage'
import { GlobalContext } from '../context/Global'

const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;

function Repos() {
  const { repos, loading: reposLoading, error: reposError } = useFetchGithubRepos(GH_TOKEN, { per_page: 100 })
  const { languages } = useLanguage(repos);

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
