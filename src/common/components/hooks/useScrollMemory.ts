import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useScrollMemory = (): void => {
  const router = useRouter()

  useEffect(() => {
    if (
      document.body.scrollHeight > Number(sessionStorage.getItem(router.asPath))
    ) {
      window.scrollTo({
        top: Number(sessionStorage.getItem(router.asPath)),
      })
    }

    const handler = (): void => {
      sessionStorage.setItem(router.asPath, String(window.scrollY))
    }

    router.events.on('routeChangeStart', handler)

    return () => router.events.off('routeChangeStart', handler)
  })
}
