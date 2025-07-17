import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import Cookies from 'js-cookie'
import { decrypting } from 'src/shared/utils/Common.Utils'

export const baseAuthQuery =
    (baseUrl: string) => async (args: any, api: any, extraOptions: any) => {
        const startTime = Date.now()

        // Create the base query with headers setup
        const baseQuery = fetchBaseQuery({
            baseUrl,
            prepareHeaders: (headers: Headers) => {
                const authToken = Cookies.get('token')
                if (authToken) {
                    headers.set('Authorization', authToken)
                }
                return headers
            },
        })

        // Execute the query
        var result = await baseQuery(args, api, extraOptions)

        // Calculate response time
        const responseTime = Date.now() - startTime

        if (result.data) {
            if (process.env.REACT_APP_ENV === 'production') {
                result = { ...result, data: decrypting(result.data) }

                // @ts-ignore
                result.data.responseTime = responseTime
            } else {
                // @ts-ignore
                result.data.responseTime = responseTime
            }
            // @ts-ignore
            // result.data.responseTime = responseTime
        }

        return result
    }
