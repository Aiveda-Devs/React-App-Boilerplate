import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { URL, decrypting, encrypting } from 'src/shared/utils/Common.Utils'
import { baseAuthQuery } from './auth.interceptor'

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseAuthQuery(URL() + '/dashboard'),
    tagTypes: [],
    endpoints: (build) => ({}),
})

export const {} = dashboardApi
