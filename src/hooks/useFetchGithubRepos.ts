import { useState, useEffect } from 'react';
import type { GithubRepo } from '../types';
import { queryStringMaker } from '../logic';

type GHRepoOptions = {
  type?: 'all' | 'owner' | 'user';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

const useFetchGithubRepos = (token: string, options?: GHRepoOptions) => {
  if (!token) {
    throw new Error('username and token are required');
  }
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  console.log('useFetchGithubRepos');

  const getRepos = () => {
    console.log('getRepos');
    try {
      const url = `https://api.github.com/user/repos${queryStringMaker(options)}`;
      fetch(url, {
        headers: new Headers({
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json"
        })
      })
        .then(res => res.json())
        .then(setRepos)
        .finally(() => setLoading(false));
    } catch (error) {
      setError(error);
    }
  }

  return { repos, loading, error, getRepos };
}

export { useFetchGithubRepos };