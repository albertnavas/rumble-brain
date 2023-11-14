import { goto } from '$app/navigation'
import type { HandleClientError } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').HandleClientError} */
export const handleError = (async ({ error, event }) => {
  const errorId = crypto.randomUUID()
  console.error('HOOK ERROR', error, event)

  if (error.message === 'TOKEN_ERROR' || error.message === 'TOKEN_EXPIRED') {
    localStorage.removeItem('userInfo')
    console.error('TOKEN_ERROR')
    goto('/login')
  }

  return {
    message: 'Something went wrong :(',
    errorId,
  }
}) satisfies HandleClientError
