import { useEffect, useState, useContext } from "react"

import { useFetchGithubUser } from "../hooks/useFetchGithubUser"
import PublicProfile from "../components/PublicProfile"
import { GlobalContext } from "../context/Global"

function Profiles() {
  const { users, setUsers } = useContext(GlobalContext)
  const [username, setUsername] = useState("")
  const [searchUser, setSearchUsername] = useState("Arbust908")
  const { user, loading, error } = useFetchGithubUser(searchUser)

  const isUsableUser = username && username.length > 3

  const getUser = () => {
    if (isUsableUser) {
      setSearchUsername(username)
    }
  }

  useEffect(() => {
    if (user) {
      const isNewUser = users.filter(profile => profile.id === user.id).length === 0
      if (isNewUser) {
        const newProfiles = [...users]
        newProfiles.push(user)
        setUsers(newProfiles)
        setUsername("")
      }
    }
  }, [user])

  return (
    <>
      <h2 className="text-4xl font-light text-teal-600 underline decoration-offset-2">Profiles</h2>
      <section className="">
        <form className="flex flex-col gap-4 items-start max-w-sm mx-auto">
          <input className="w-full rounded border border-teal-600 border-b-2 px-4 py-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button
            className={`${isUsableUser ? 'bg-teal-400 text-slate-800 border-teal-700 hover:shadow-lg hover:bg-teal-300' : 'bg-teal-500 text-slate-800 cursor-not-allowed'} ml-auto  rounded-full px-4 py-2 border border-2 `}
            type="button"
            onClick={getUser}
            disabled={!isUsableUser}
          >
            Get User
          </button>
        </form>
      </section>
      <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <h3 className="col-span-full">Tenemos { users.length } perfiles</h3>
        { users.map(profile => <PublicProfile key={profile.id} user={profile} />) }
      </section>
    </>
  )
}

export default Profiles
