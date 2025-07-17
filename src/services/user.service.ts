import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import Cookies from 'js-cookie'
import {
    APIResponse,
    Forgot,
    ILogin,
    Login,
    ResetPassword,
    Signup,
    VerifyOtp,
} from 'src/core/types'
import { URL, decrypting, encrypting } from 'src/shared/utils/Common.Utils'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: URL() + '/users',
    }),
    tagTypes: [],
    endpoints: (build) => ({
        login: build.mutation<Login, ILogin>({
            query: (body: ILogin) => ({
                url: 'login',
                method: 'POST',
                body: encrypting(body),
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
        forgotPassword: build.mutation<Forgot, { email: string }>({
            query: (body: { email: string }) => ({
                url: 'forgotPassword',
                method: 'POST',
                body: encrypting(body),
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
        verifyOtp: build.mutation<APIResponse, VerifyOtp>({
            query: (body: VerifyOtp) => ({
                url: 'verifyOtp',
                method: 'POST',
                body: encrypting(body),
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
        resetPassword: build.mutation<APIResponse, ResetPassword>({
            query: (body: ResetPassword) => ({
                url: 'resetPassword',
                method: 'POST',
                body: encrypting(body),
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
        logout: build.query<{ messaage: string }, void>({
            query: (body) => ({
                headers: {
                    Authorization: Cookies.get('token'),
                },
                url: 'logout',
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
        signup: build.mutation<APIResponse, Signup>({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body: encrypting(body),
            }),
            transformResponse: (response) => decrypting(response),
            transformErrorResponse: (response) => decrypting(response),
        }),
    }),
})

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
    useLogoutQuery,
    useSignupMutation,
} = userApi
