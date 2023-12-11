export type LoginRequestType = {
  email: string,
  password: string
}
export type SignUpRequestType = LoginRequestType & {} //мб добавится (remember me)

export type LoginResponseType = {
  email: string,
  token: string,
  error?: string
}

export type SignUpResponseType = LoginResponseType & {} //мб добавится (remember me)
