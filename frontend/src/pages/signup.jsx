
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be atleast two characters long")
    .max(20, "Username can't be more than 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
    firstName: z.string()
    .min(1, { message: "first-Name must contain atleast characters" }),
    lastName: z.string()
    .min(1, { message: "last-Name must contain atleast characters" }),
    password: z.string()
    .min(6, { message: "Password must contain atleast 6 characters" }),
})

export function Signup() {


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName:'',
      lastName:'',
      password: '',
    }
  })

  const onSubmit = async (data) => {
    console.log("data from form", data)
  }
  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className=" text-center">
          <h1 className=" text-4xl font-extrabold lg:text-3xl mb-6">Join and Chat with anyone</h1>
          <p className=" mb-4">Sign up to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forst Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div className=" text-center mt-4">
          <p>
            Already a member?
            <Link to="/" className="text-blue-600 hover:text-blue-800"> Sign-In </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
