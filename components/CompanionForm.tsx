'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name : z.string().min(1 , {message:"companion is required"}),
  subject : z.string().min(1,{message:"subject is required"}),
  topic : z.string().min(1,{message:"topic is required"}),
  voice : z.string().min(1,{message:"Voice is required"}),
  style : z.string().min(1,{message:"style is required"}),
  duration : z.coerce.number().min(1,{message:"Duration is required"}),
})

const CompanionForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:"",
      subject:"",
      topic:"",
      voice:"",
      style:"",
      duration:15
    }
  })

  const onSubmit = async (values:z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values)
    console.log(companion)

    if(companion){
      console.log(companion)
      redirect(`/companions/${companion.id}`)
    }else{
      console.log("Failed to create companion")
      redirect("/")
    }
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Companion Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter The Companion name" {...field} className="input"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >

          </FormField>
          <FormField
            control={form.control}
            name="subject"
            render={({field}) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="select the Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject)=>(
                        <SelectItem 
                          value={subject} 
                          key={subject} 
                          className="capitalize" 
                        >{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >

          </FormField>
          <FormField
            control={form.control}
            name="topic"
            render={({field}) => (
              <FormItem>
                <FormLabel>Companion Name</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ex. Derivates & Integrals" {...field} className="input"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >

          </FormField>
          <FormField
            control={form.control}
            name="voice"
            render={({field}) => (
              <FormItem>
                <FormLabel>Voice</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input">
                      <SelectValue placeholder="select the Voice" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >

          </FormField>
          <FormField
            control={form.control}
            name="style"
            render={({field}) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input">
                      <SelectValue placeholder="Select the Style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">casual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >

          </FormField>
          <FormField
            control={form.control}
            name="duration"
            render={({field}) => (
              <FormItem>
                <FormLabel>Estimated Session Duration in minutes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} className="input"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          >
          </FormField>
          <Button type="submit" className="w-full cursor-pointor">Build your Companion</Button>
        </form>
    </Form>
  )
}

export default CompanionForm
