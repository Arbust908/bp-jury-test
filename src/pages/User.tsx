
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PublicProfile from '../components/PublicProfile'
import { RepoCardList } from '../components/RepoCardList'
import { queryStringMaker } from '../logic'

const clientId = import.meta.env.VITE_CLIENT_ID

export default function LogIn() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [auth, setAuth] = useState(false)
  const [userData, setUserData] = useState(null as any)
  const [isLoading, setIsLoading] = useState(false)
  const [userCode, setUserCode] = useState('')

  useEffect(() => {
    if (userCode) {
      const GH_code = userCode
      setAuth(true)
      const payload = {
        code: GH_code,
      }
      setIsLoading(true)
      fetch(`http://localhost:5000/authenticate`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setUserData(res)
        })
        .catch(err => console.log(err.message))
        .finally(() => setIsLoading(false))
    }
  }, [userCode])

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) return
    setUserCode(code)
  }, [searchParams])

  return (
    <div>
      <h1 className='text-center font-light text-6xl underline decoration-blue-600'>{auth ? 'Welcome' : 'Login'}</h1>
      {isLoading ? <p>Loading</p> :
        <section className='p-6 flex flex-col justify-center items-center'>
          {auth
            && <p className='text-center'>You are logged in</p>
          }
          {
            userData && userData?.user && <PublicProfile user={userData.user} />
          }
          {
            userData && userData?.repos && <RepoCardList repos={userData.repos} />
          }
        </section>
      }
    </div>
  );
}
