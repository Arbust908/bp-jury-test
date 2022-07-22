import { queryStringMaker } from '../logic'

const clientId = import.meta.env.VITE_CLIENT_ID

export default function LogIn() {
  const ghUrl = () => {
    const qs = queryStringMaker({
      client_id: clientId,
      scope: 'user%20repo',
    })
    return `https://github.com/login/oauth/authorize${qs}`
  }
  return (
    <>
      <h2 className='text-center font-light text-6xl underline decoration-blue-600'>
        Login
      </h2>
      <a className='inline-flex my-4 mx-auto rounded bg-blue-400 text-blue-200 px-4 py-2 shadow hover:shadow-lg hover:bg-blue-600' href={ghUrl()}>Login</a>
    </>
  );
}
