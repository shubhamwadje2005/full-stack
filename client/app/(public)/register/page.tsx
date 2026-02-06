"use client"
import { useSignupMutation } from '@/redux/api/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'


const Register = () => {
    const [signup] = useSignupMutation()
    //                👇nextjs navigater
    const router = useRouter()
    const RegisterSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
    })
    type RegisterType = z.infer<typeof RegisterSchema>

    const { reset, register, handleSubmit, formState: { errors } } = useForm<RegisterType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(RegisterSchema)
    })

    const handleRegister = async (data: RegisterType) => {
        try {
            await signup(data).unwrap()
            toast.success("User register Success")
            reset()
            router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("unable to register")
        }
    }
    return <>
        <form onSubmit={handleSubmit(handleRegister)}>
            <input placeholder="enter name" type="name" {...register("name")} />
            <input placeholder="enter email" type="email" {...register("email")} />
            <input placeholder="enter password" type="password" {...register("password")} />
            <button type='submit'>Register</button>
        </form>
    </>
}

export default Register