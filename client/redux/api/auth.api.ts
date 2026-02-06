import { User } from "@/types/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/auth",
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
        credentials: "include"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            signup: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            signin: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            signout: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/singout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const { useSignupMutation, useSigninMutation, useSignoutMutation } = authApi
