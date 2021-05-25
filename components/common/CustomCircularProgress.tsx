import { CircularProgress } from '@material-ui/core'
import React from 'react'

export const CustomCircularProgress: React.FC = () => {
  return (
    <div
      style={{
        zIndex: 5,
        position: 'absolute',
        left: '-10px',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  )
}
