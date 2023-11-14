const isDev = import.meta.env.DEV

export default {
  serverUrl: isDev ? 'http://localhost:3000' : 'https://gooquiz-server.albertnavas.es',
}
