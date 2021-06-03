type InputTypes = 'text' | 'number' | 'email' | 'password' | 'checkbox'

type InputsProps = {
  name: string
  label: string
  type: InputTypes
}

type RegData = {
  [key: number]: Array<InputsProps>
}

export const regData: RegData = {
  1: [
    {
      name: 'login',
      label: 'Login*',
      type: 'text',
    },
    {
      name: 'nickname',
      label: 'Nickname*',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email*',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password*',
      type: 'password',
    },
    {
      name: 'passwordConfirmation',
      label: 'Confirm password*',
      type: 'password',
    },
  ],
  2: [
    {
      name: 'age',
      label: 'Type your age*',
      type: 'number',
    },
    {
      name: 'favFilm',
      label: 'Wht is your favorite film*',
      type: 'text',
    },
  ],

  3: [
    {
      name: 'bilName',
      label: 'Billing name*',
      type: 'text',
    },
    {
      name: 'taxNumber',
      label: 'TAX number*',
      type: 'number',
    },
    {
      name: 'bilEmail',
      label: 'Billing email*',
      type: 'email',
    },
    {
      name: 'bilPhone',
      label: 'Billing phone*',
      type: 'number',
    },
    {
      name: 'zip',
      label: 'ZIP code*',
      type: 'number',
    },
    {
      name: 'country',
      label: 'Your country*',
      type: 'text',
    },
    {
      name: 'city',
      label: 'Your city*',
      type: 'text',
    },
  ],
}
