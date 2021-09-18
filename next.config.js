module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies/popular/1',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
