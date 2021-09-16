import { CircularProgress, Box } from '@material-ui/core'
import React from 'react'

export const CustomCircularProgress: React.FC = () => {
  return (
    <Box
      zIndex={5}
      position={'absolute'}
      display={'flex'}
      width={'100%'}
      justifyContent={'center'}
      top={'50%'}
    >
      <CircularProgress />
    </Box>
  )
}
