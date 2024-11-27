import { memo } from 'react';


export interface RegisterProps {


}


export const RegisterUsername = memo(() => {


  return <>

  </>
})

export const RegisterPassword = memo(() => {


  return <>


  </>
})

export const RegisterEmail = memo(() => {

  return <>

  </>
})


export const Register = memo((props: RegisterProps) => {


  return <>

    <RegisterUsername />

    <RegisterPassword />

    <RegisterEmail />
  </>
})

export default Register;
