import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { URL, decrypting, encrypting } from 'src/shared/utils/Common.Utils'
import { baseAuthQuery } from './auth.interceptor'

export const superUserApi = createApi({
    reducerPath: 'superUserApi',
    baseQuery: baseAuthQuery(URL() + '/superUser'),
    tagTypes: [],
    endpoints: (build) => ({}),
})

export const {} = superUserApi
