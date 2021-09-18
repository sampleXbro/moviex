import { PlayCircleOutline, StarBorder, Whatshot } from '@material-ui/icons'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

type Icons = {
  [key: number]: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
}

export const SESSION_NAME = 'moviex/request_token'

export const routes = [
  { id: 2, title: 'Популярные', path: '/movies/popular/1' },
  { id: 1, title: 'Рейтинговые', path: '/movies/top-rated/1' },
  { id: 3, title: 'Избранные', path: '/favorite' },
]

const icons: Icons = {
  1: PlayCircleOutline,
  2: Whatshot,
  3: StarBorder,
}

export const getIcon = (
  id: number
): OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> => icons[id]
