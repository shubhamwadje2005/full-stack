"use client"
import { useSigninMutation } from '@/redux/api/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {

  const [signin] = useSigninMutation()
  const router = useRouter()
  const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
  type loginType = z.infer<typeof loginSchema>

  const { reset, register, handleSubmit, formState: { errors } } = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = async (data: loginType) => {
    try {
      await signin(data).unwrap()
      toast.success("User login Success")
      reset()
      router.push("/demo")
    } catch (error) {
      console.log(error)
      toast.error("unable to login")
    }
  }
  return <>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input placeholder="enter email" type="email" {...register("email")} />
      <input placeholder="enter paassword" type="password" {...register("password")} />
      <button type='submit'>login</button>
    </form>
  </>
}

export default Login