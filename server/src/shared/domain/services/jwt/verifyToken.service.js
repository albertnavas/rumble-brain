const { jwtDecode } = require('jwt-decode')
const { OAuth2Client } = require('google-auth-library')

const verifyToken = async (token) => {
  const client = new OAuth2Client()

  const ticket = await client.verifyIdToken({ idToken: token })

  return ticket.getPayload()
}

const verifyTokenTestEndToEnd = (token) => {
  const tokenInfo = jwtDecode(token)
  if (tokenInfo.email !== 'test-82bs782@gmail.com') {
    return false
  }

  return tokenInfo
}

const verifyTokenService = async (token) => {
  if (process.env.END_TO_END) {
    return verifyTokenTestEndToEnd(token)
  }

  return verifyToken(token)
}

module.exports = {
  verifyTokenService,
}
