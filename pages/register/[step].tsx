import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Box,
} from '@material-ui/core'
import { CustomCircularProgress } from '../../components/common/CustomCircularProgress'
import { regData } from '../../components/registration/regData'
import Head from 'next/head'
const FirstRegForm = dynamic(
  () => import('../../components/registration/FirstRegForm'),
  { ssr: false }
)
const SecondRegForm = dynamic(
  () => import('../../components/registration/SecondRegForm'),
  { ssr: false }
)
const ThirdRegForm = dynamic(
  () => import('../../components/registration/ThirdRegForm'),
  { ssr: false }
)

export default function RegisterPage(): React.ReactElement {
  const router = useRouter()

  const step = Number(router.query.step)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isUploader, setIsUploader] = useState<boolean>(false)

  useEffect(() => {
    if (!Object.keys(regData).includes(String(step))) {
      router.replace('/register/1')
    }
  })

  const maxSteps: number = isUploader ? 3 : 2

  const renderSteps = (step: number): React.ReactNode => {
    switch (step) {
      case 1:
        return (
          <FirstRegForm
            setIsLoading={setIsLoading}
            setIsUploader={setIsUploader}
          />
        )
      case 2:
        return <SecondRegForm setIsLoading={setIsLoading} maxSteps={maxSteps} />
      case 3:
        return <ThirdRegForm setIsLoading={setIsLoading} maxSteps={maxSteps} />
    }
  }

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <Box
        position={'relative'}
        maxWidth={'400px'}
        margin={'0 auto'}
        marginTop={'20px'}
      >
        <Paper elevation={3}>
          <Box padding={'15px'}>
            <Typography variant={'h5'} align={'center'}>
              Registration
            </Typography>
            <Stepper activeStep={step - 1}>
              {new Array(maxSteps).fill('').map((item, i) => (
                <Step key={i}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>
            {isLoading && <CustomCircularProgress />}
            {renderSteps(step)}
          </Box>
        </Paper>
      </Box>
    </>
  )
}
