export type AdminInfo = {
  email: string
  exp: number
  name: string
  picture: string
  token: string
} | null

export type JwtDecoded = {
  name: string
  email: string
  picture: string
  exp: number
} | null

export type PlayerConnectionData = {
  gameId: string
  playerName: string
  playerConnectionToken: string
} | null

export type ErrorStore = {
  type: string
  message: string
} | null
