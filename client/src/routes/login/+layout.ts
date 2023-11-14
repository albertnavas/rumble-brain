import { goto } from '$app/navigation'

export const load = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo !== null) goto('/juego')

  return {}
}
