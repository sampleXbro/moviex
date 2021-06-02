import { PlayCircleOutline, StarBorder, Whatshot } from '@material-ui/icons'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

type Icons = {
  [key: number]: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
}

export const SESSION_NAME = 'moviex/request_token'

export const routes = [
  { id: 1, title: 'Now playing', path: '/movies/now-playing/1' },
  { id: 2, title: 'Popular', path: '/movies/popular/1' },
  { id: 3, title: 'Favorite', path: '/favorite' },
]

const icons: Icons = {
  1: PlayCircleOutline,
  2: Whatshot,
  3: StarBorder,
}

export const getIcon = (
  id: number
): OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> => icons[id]
