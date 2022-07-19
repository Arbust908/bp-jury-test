import { useState, useEffect } from "react";
import type { GithubRepo, Lang } from '../types'

const useLanguage = (repos: GithubRepo[]) => {
  const [languages, setLanguages] = useState<Lang[]>([])

  useEffect(() => {
    if (repos && repos.length) {
      const langs = repos.reduce((acc, repo) => {
        const langName = repo.language || 'Others'
        const found = acc.find(lang => lang.name === langName)
        if (!found) {
          acc.push({ name: langName, value: 1 })
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