module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/now-playing',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
