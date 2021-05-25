module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/now-playing',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/register/1',
        permanent: true,
      },
    ]
  },
}
