import { useRouter } from 'next/router'
//import { wrapper } from '../../redux/store'
//import { getMovieApi } from '../../components/api/api'

export default function MoviePage() {
  const router = useRouter()
  const { id } = router.query
  return <div>{id}</div>
}

/*export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const { data } = await getMovieApi(Number(params?.id))
  }
)*/
