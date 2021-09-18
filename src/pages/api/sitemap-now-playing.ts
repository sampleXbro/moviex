import { SitemapStream, streamToPromise } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNowPlayingMoviesApi } from '../../common/api/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    })

    const { data } = await getNowPlayingMoviesApi()

    let curPage = 1

    do {
      smStream.write({
        url: `/movies/now-playing/${curPage}`,
        changefreq: 'daily',
        priority: 0.9,
      })

      curPage += 1
    } while (curPage <= data.total_pages)

    smStream.end()

    const sitemapOutput = (await streamToPromise(smStream)).toString()

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(sitemapOutput)
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}
