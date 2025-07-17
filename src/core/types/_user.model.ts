import { Config } from './_config.model'

export interface ILogin {
    email?: string
    password?: string
    super_user?: boolean
    type?: 'Default' | 'Google' | 'Linkedin'
}

export interface Login {
    token: string
    navigate?: string
    config: Config
}

export interface Forgot {
    message: string
    jwtToken: string
}

export interface VerifyOtp {
    otp: number
    jwtToken: string
    email: string
}

export interface ResetPassword {
    email: string
    password: string
    jwtToken: string
}

export interface Signup {
    userName: string
    email: string
    password: string
    admin: boolean
    companyId: number
    phone: number
}
