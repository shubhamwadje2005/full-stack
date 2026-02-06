import { Todo } from "@/types/Todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/todo",
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todo`,
        credentials: "include"
    }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodo: builder.query<Todo[], void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            addTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),


            updateTodo: builder.mutation<void, Todo>({
                query: todoData => {
                    return {
                        url: "/modify/" + todoData._id,
                        method: "PATCH",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            DeleteTodo: builder.mutation<void, string>({
                query: _id => {
                    return {
                        url: "/remove/" + _id,
                        method: "DELETE",
                        // body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const { useAddTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useUpdateTodoMutation } = todoApi
