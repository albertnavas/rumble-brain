const isDev = import.meta.env.DEV

export default {
  serverUrl: isDev ? 'http://localhost:3000' : 'https://server.rumblebrain.com',
}
