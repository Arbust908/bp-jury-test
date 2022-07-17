import { useState, useEffect } from 'react';
import type { GithubUser } from '../types';

const useFetchGithubUser = (username: string) => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json() as Promise<GithubUser>)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username]);

  return { user, loading, error };
}

export { useFetchGithubUser };