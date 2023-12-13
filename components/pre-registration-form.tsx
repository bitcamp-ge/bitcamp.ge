"use client"

import { useState } from "react"
import Link from "next/link"

import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"

export default function PreRegistrationForm({
  formTitle,
  formDescription,
  marketingEmailAddress,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const sendEmail = async (subjectName) => {
    try {
      console.log("შევიდა try ")
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marketingEmailAddress: marketingEmailAddress,
          subjectName: subjectName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        }),
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const postRoute = window.location.pathname

      const response = await fetch("/api/pre-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
          source: postRoute,
        }),
      })

      sendEmail(postRoute)

      if (!response.ok) throw new Error("Failed to save message")

      setSubmitted(true)
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription className="pt-2 leading-7">
          {formDescription}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <p className={submitted ? "py-5 leading-7" : "hidden"}>
            გმადლობთ {formData.firstName}! ✅
            <br />
            <br />
            თქვენი ინფორმაცია მიღებულია, ჩვენი წარმომადგენელი დაგიკავშირდებათ
            უახლოეს მომავალში. 🎉
            <br />
            <br />
            თუ ახლავე გსურთ ჩვენთან დაკავშირება, მოგვწერეთ Facebook გვერდზე{" "}
            <Link
              className="underline"
              href="https://www.facebook.com/bitcamp.ge"
              target="_blank"
            >
              https://www.facebook.com/bitcamp.ge
            </Link>{" "}
            🙏
          </p>

          <div className={submitted ? "hidden" : ""}>
            <div className="my-4 flex flex-col">
              <Label htmlFor="firstName" className="mb-2">
                სახელი
              </Label>
              <Input
                type="text"
                placeholder="თქვენი სახელი"
                id="firstName"
                name="firstName"
                required
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="lastName" className="mb-2">
                გვარი
              </Label>
              <Input
                type="text"
                placeholder="თქვენი გვარი"
                id="lastName"
                name="lastName"
                required
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="email" className="mb-2">
                ელ.ფოსტა
              </Label>
              <Input
                type="email"
                placeholder="მისამართი"
                id="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="mobile" className="mb-2">
                მობილურის ნომერი
              </Label>
              <Input
                type="tel"
                placeholder="5** ** ** **"
                id="mobile"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
                required
              />
            </div>

            <div className="mb-4 flex flex-col">
              <Label htmlFor="message" className="mb-2">
                დამატებითი ინფორმაცია
              </Label>
              <Textarea
                onChange={handleChange}
                value={formData.message}
                id="message"
                name="message"
                placeholder="შეიყვანეთ დამატებით ისეთი ინფორმაცია რაც გსურთ რომ გავითვალისწინოთ..."
              ></Textarea>
            </div>
            <button
              type="submit"
              className="rounded-md bg-green-800 px-4 py-2 text-white hover:bg-green-700"
            >
              📨 გაგზავნა
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
