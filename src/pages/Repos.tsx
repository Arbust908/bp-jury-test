import { RepoCardList } from '../components/RepoCardList'
import { LanguageChart } from '../components/LanguageChart'
import { GlobalContext } from '../context/Global'
import { useContext, useEffect } from 'react'

function Repos() {
  const { repos, languages, getRepos, isLoading, error } = useContext(GlobalContext);
  
  const isReposEmpty = () => {
    console.log('Repos', repos)
    console.log('Length', repos.length)
    console.log('Is Empty', repos?.length <= 0)
    return repos?.length <= 0
  };

  useEffect(() => {
    console.groupCollapsed('getRepos')
    if (isReposEmpty()) {
      console.log('getting Repos')
      getRepos()
    }
    console.groupEnd()
  }, [])

  return (
    <>
      {
        languages.length > 0 &&
        <section className='flex flex-col space-y-4 col-span-full min-h-300px'>
          <LanguageChart languages={languages} />
        </section>
      }
      <RepoCardList repos={repos} loading={isLoading} error={error} />
    </>
  )
}

export default Repos
