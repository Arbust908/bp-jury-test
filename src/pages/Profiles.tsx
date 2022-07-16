import { useEffect, useState } from "react"
import { GithubUser } from "../types"
import { useFetchGithubUser } from "../hooks/useFetchGithubUser"
import PublicProfile from "../components/PublicProfile"

function Profiles() {
  const [profiles, setProfiles] = useState<GithubUser[]>([])
  const [username, setUsername] = useState("")
  const [searchUser, setSearchUsername] = useState("Arbust908")
  const { user, loading, error } = useFetchGithubUser(searchUser)

  const getUser = () => {
    console.log("getUser")
  }

  useEffect(() => {
    if (user) {
      const isNewUser = profiles.filter(profile => profile.id === user.id).length === 0
      if (isNewUser) {
        const newProfiles = [...profiles]
        newProfiles.push(user)
        setProfiles(newProfiles)
      }
    }
  }, [user])

  return (
    <>
      <h2 className="text-4xl font-light text-teal-600 underline decoration-offset-2">Profiles</h2>
      <section className="">
        <form className="flex flex-col gap-4 items-start max-w-sm mx-auto">
          <input className="w-full rounded border border-teal-600 border-b-2 px-4 py-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button className="ml-auto bg-teal-400 text-slate-800 rounded-full px-4 py-2 border border-2 border-teal-700 hover:shadow-lg hover:bg-teal-300" type="button" onClick={getUser}>
            Get User
          </button>
        </form>
      </section>
      <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:gird-cols-3">
        <h3 className="col-span-full">Tenemos { profiles.length } perfiles</h3>
        { profiles.map(profile => <PublicProfile key={profile.id} user={profile} />) }
      </section>
    </>
  )
}

export default Profiles