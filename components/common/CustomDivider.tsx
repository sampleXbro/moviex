import { Divider } from '@material-ui/core'
import React from 'react'

export const CustomDivider: React.FC = () => {
  return (
    <Divider
      color={'black'}
      flexItem
      style={{ height: '1px', margin: '5px 0' }}
    />
  )
}
