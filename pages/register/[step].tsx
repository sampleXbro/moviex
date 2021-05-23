import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Typography, Paper } from '@material-ui/core'
import { CustomCircularProgress } from '../../components/CustomCircularProgress'
const FirstRegForm = dynamic(
  () => import('../../components/registration/FirstRegForm')
)
const SecondRegForm = dynamic(
  () => import('../../components/registration/SecondRegForm')
)
const ThirdRegForm = dynamic(
  () => import('../../components/registration/ThirdRegForm')
)

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploader, setIsUploader] = useState<boolean>(false)

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

  const step: number = +router.query.step

  return (
    <>
      <div
        style={{
          position: 'relative',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Paper elevation={3} style={{ padding: '15px', marginTop: '20px' }}>
          <Typography
            variant={'h5'}
            align={'center'}
            style={{ marginTop: '25px' }}
          >
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
        </Paper>
      </div>
    </>
  )
}
