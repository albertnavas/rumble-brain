import type { AdminInfo } from '../../@types/global'

export const load = (() => {
  // Get Admin Info
  const userInfo = localStorage.getItem('userInfo')

  if (!userInfo) {
    return { adminInfo: null }
  }

  const adminInfo = JSON.parse(userInfo) as AdminInfo
  if (!adminInfo) {
    return { adminInfo: null }
  }

  if (adminInfo.exp < Date.now() / 1000) {
    return {
      adminInfo: null,
    }
  }

  return { adminInfo }
})
