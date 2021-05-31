module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies/now-playing/1',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
