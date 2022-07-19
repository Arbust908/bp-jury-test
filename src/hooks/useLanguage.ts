import { useState, useEffect } from "react";
import type { GithubRepo, Lang } from '../types'

const useLanguage = (repos: GithubRepo[]) => {
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

  return { languages }
}

export { useLanguage };