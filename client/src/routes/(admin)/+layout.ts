import { goto } from '$app/navigation'

export const load = (() => {
  // Get Admin Info
  const userInfo = localStorage.getItem('userInfo')

  if (!userInfo) {
    return goto('/login')
  }

  const adminInfo = JSON.parse(userInfo)
  if (adminInfo.exp < Date.now() / 1000) {
    return goto('/login')
  }
})