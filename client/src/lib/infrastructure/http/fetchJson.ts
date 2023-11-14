import config from '$lib/config'

type FetchParams = { [key: string]: string | object }

const whiteList = ['/admin/signin', '/game/join']

export default async (path: string, method: string, params: FetchParams) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (whiteList.includes(path) === false) {
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) throw new Error('No user info found')

    headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`
  }

  const res = await fetch(`${config.serverUrl}${path}`, {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify(params) : undefined,
  })

  const response = await res.json()

  if (response.status === false) {
    console.error('HTTP fetch error', response)
    throw new Error(response.code)
  }

  return response
}
