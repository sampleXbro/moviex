import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { getMovieSaga, setMovie } from '../index'
import singleMovieReducer from '../singleMovieSlice'
import { mockMovie, mockVideosArray } from '../../../__mocks__/mocks'
import { getMovieApi, getMovieVideosApi } from '../../../common/api/api'
import { call } from 'redux-saga-test-plan/matchers'

test('should be correct order', () => {
  const saga = testSaga(getMovieSaga, {
    type: 'singleMovie/getMovie',
    payload: '508943',
  })

  saga
    .next()
    .next({ data: mockMovie })
    .next({ data: { results: mockVideosArray } })
    .put(
      setMovie({
        data: mockMovie,
        videos: mockVideosArray,
      })
    )
    .next()
    .isDone()
})

test('should have correct state after put', () => {
  const saga = expectSaga(getMovieSaga, {
    type: 'singleMovie/getMovie',
    payload: '508943',
  })

  return saga
    .withReducer(singleMovieReducer)
    .provide([
      [call(getMovieApi, '508943'), { data: mockMovie }],
      [
        call(getMovieVideosApi, '508943'),
        { data: { results: mockVideosArray } },
      ],
    ])
    .hasFinalState({
      data: mockMovie,
      videos: mockVideosArray,
      isLoading: false,
    })
    .run()
})
