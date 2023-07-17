"use client"

import * as z from "zod"
import { Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { FunctionComponent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [error, setError] = useState("")
  const session = useSession()
  const router = useRouter()
  const { data: user } = session

  useEffect(() => {
    if (user) {
      if (user.user.role === "admin") router.push("/admin")
      if (user.user.role === "user") router.push("/dashboard")
    }
  }, [session])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setButtonLoading(true)

    signIn("credentials", {
      redirect: false,
      ...values,
      callbackUrl: "/",
    }).then(response => {
      console.log(response)
      const { error } = response || {}

      if (error) {
        setError(error)

        return (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )
      }

      router.push("/admin")
    })
  }

  return (
    <div className="grid h-screen place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Insert your informations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" type="submit" disabled={buttonLoading}>
                {buttonLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default Home
