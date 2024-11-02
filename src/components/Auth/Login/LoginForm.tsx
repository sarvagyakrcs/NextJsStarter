"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"
import { LoginSchema } from "@/lib/schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "@/components/Global/ErrorMessage"
import { useState } from "react"
import { LuLoader2 } from "react-icons/lu"
import { Login } from "@/actions/Auth/login"
import  SuccessToast  from "@/components/Global/SuccessToast"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"
import { LoginSchemaType } from "@/lib/schema/LoginSchema"

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
    });

    const handleLogin = async (data: LoginSchemaType) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await Login(data);
            if (response && response.success_status) {
                setSuccess(response.success);
            } else if (response && !response.success_status) {
                setError(response.error);
            } else {
                setError("An unexpected error occurred");
            }
        } catch (error) {
            setError("An error occurred while logging in");
            console.error(error); // Log the error for debugging purposes
        } finally {
            setIsLoading(false);
            if (!error) {
                reset()
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-sm mx-auto">
      <Card className="w-full my-6 bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isLoading}
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="abc@example.com"
              className="font-mono"
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={isLoading}
              {...register("password", { required: "Password is required" })}
              id="password"
              type="password"
              placeholder="⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺"
            />
            {errors.password && <ErrorMessage message={errors.password.message}/>}
            {error && <ErrorMessage message={error} />}
            {success && <SuccessToast message={success} />}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <LuLoader2 className="animate-spin mr-2" /> : "Login"}
          </Button>
          <div className="grid grid-cols-2 gap-2 mt-2 w-full">
            <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" disabled={isLoading} className="w-full">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
          <Link href="/password/reset/form" className="text-primary hover:underline mt-4 text-sm">
            Forgotten Your Password?
          </Link>
          <p className="text-sm mt-2">
            Lost, Want to Go Back? <Link className="text-primary hover:underline" href="/">Home</Link>
          </p>
          {errors.root && <ErrorMessage message={errors.root.message} />}
        </CardFooter>
      </Card>
      <Card className="mt-4 p-4 text-sm w-full flex items-center justify-center bg-card text-card-foreground">
        <Link href="/register" className="text-primary hover:underline">
          Create New Account
        </Link>
      </Card>
    </form>
        
    )
}