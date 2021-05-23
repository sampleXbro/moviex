export type NextRegFormsProps = {
  setIsLoading: (val: boolean) => void
  maxSteps: number
}

export type ConfirmButtonText = 'Complete' | 'NEXT'

export type FirstRegFormData = {
  login: string
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
  isUploader: boolean
  isAcceptRules: boolean
}

export type SecondRegFormData = {
  age: string
  favFilm: string
} & FirstRegFormData

export type ThirdRegFormData = {
  bilName: string
  taxNumber: string
  bilEmail: string
  bilPhone: string
  zip: string
  country: string
  city: string
} & SecondRegFormData
