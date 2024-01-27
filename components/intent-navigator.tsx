"use client"

import { setTimeout } from "timers"
import * as React from "react"
import Link from "next/link"
import { IntentItem } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { RocketIcon, ZapIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { env } from "@/env.mjs"
import { intentItems } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { getServiceByMachineName } from "@/lib/services"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// import { sendKidsInfo } from "@/app/api/kids-form/route"

import { Button } from "./ui/button"
import { Form } from "./ui/form"
import { KidsForm } from "./ui/kids-form"

const FormSchema = z.object({
  kidsform: z.object({
    age: z.string({
      required_error: "ასაკის არჩევა სავალდებულოა.",
    }),
    availability: z.string({
      required_error: "დროს არჩევა სავალდებულოა",
    }),
  }),
})

async function sendKidsInfo({
  token,
  age,
  availability,
}: {
  token: string
  age: string
  availability: string
}) {
  const newInfo = {
    age,
    availability,
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/kids/newprofile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newInfo),
      }
    )
    if (!response?.ok) {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

export default function IntentNavigator({ triggerEnrollment, payload }) {
  const [intent, setIntent] = React.useState<IntentItem>(intentItems.none)
  const { data: user } = useSession()
  const [fetchingEnrollment, setFetchingEnrollment] = React.useState<any>(false)

  React.useEffect(() => {
    const currentIntent = localStorage.getItem("intent")
    if (currentIntent) {
      setIntent(intentItems[currentIntent])
    }
  }, [])

  const currentService = getServiceByMachineName(intent.machine_name)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { age, availability } = data.kidsform
    console.log(user)
    sendKidsInfo({
      token: user?.user.accessToken || "",
      age,
      availability,
    })
  }

  return (
    <>
      {currentService && intent.machine_name !== "none" && (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>{currentService.title}</AlertTitle>
          <AlertDescription>
            <br />
            {intent.description}
            <br />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                {intent.machine_name === "kids" && <KidsForm form={form} />}
                {intent.action === "link" && (
                  <Link href={intent.url}>
                    <Button
                      className="my-4"
                      disabled={fetchingEnrollment}
                      type="submit"
                    >
                      {fetchingEnrollment && (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                          მოითმინეთ
                        </>
                      )}
                      {!fetchingEnrollment && <>{intent.actionLabel}</>}
                    </Button>
                  </Link>
                )}

                {intent.action === "buy" && (
                  <Button
                    disabled={fetchingEnrollment}
                    className="my-4"
                    type="submit"
                    onClick={async () => {
                      if (
                        !form.getValues("kidsform.age") ||
                        !form.getValues("kidsform.availability")
                      ) {
                        return
                      }
                      setFetchingEnrollment(true)
                      await triggerEnrollment(true)
                      setFetchingEnrollment(false)
                    }}
                  >
                    {fetchingEnrollment && (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                        მოითმინეთ
                      </>
                    )}
                    {!fetchingEnrollment && <>გადახდა</>}
                  </Button>
                )}
              </form>
            </Form>
          </AlertDescription>
        </Alert>
      )}

      {currentService && intent.machine_name === "kids" && (
        <Alert variant="destructive">
          <ZapIcon className="h-4 w-4" />
          <AlertTitle>ყურადღება!</AlertTitle>
          <AlertDescription>
            <div className="text-white">
              <br />
              BitCamp Kids - ის საბავშვო პროგრამაში გაკვეთლების ჩატარების
              სტანდარტული დრო არის საღამოს 4 საათი (16:00). ორშაბათს, ოთხშაბათს
              და პარასკევს.
              <br />
              <br />
              თუმცა თუ ვერ მოახერხებთ ასეთ დროს გაკვეთილებზე დასწრებას, გთხოვთ
              მოგვწეროთ თქვენთვის სასურველი დროები ჩვენს Facebook გვერდზე და თუ
              საკმარისი რაოდენობის მოსწავლეები მოგროვდებიან თქვენთვის სასურველ
              დროს, გავხსნით ახალ ჯგუფებს 🙏
              <br />
              <br />
              <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                <Button variant="destructive" className="my-4">
                  Facebook გვერდი
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
