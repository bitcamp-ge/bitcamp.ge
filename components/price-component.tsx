"use client"

import React, { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProgramDropdownSelector from "./program-dropdown-selector"

type PricingSwitchProps = {
  onSwitch: (value: string) => void
}

type PricingCardProps = {
  isYearly?: boolean
  title: string
  monthlyPrice?: number | string
  yearlyPrice?: number | string
  description: string
  features: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
}

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="pt-2 text-xl">{subtitle}</p>
    <br />
  </section>
)

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const [selectedProgram, setSelectedProgram] = useState("")
  const route = useRouter()

  const handleRegistartion = function () {
    localStorage.setItem("selectedProgram", selectedProgram)
    localStorage.setItem("selectedTitle", title)
    route.push("/register")
  }

  return (
    <Card
      className={cn(
        `flex w-full ${
          title === "BitCamp Kids" || title === "PRO"
        } flex-col justify-between py-1 ${
          popular ? "border-rose-400" : "border-zinc-700"
        } mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
            exclusive,
        }
      )}
    >
      <div>
        <CardHeader
          className={`w-full ${
            title === "BitCamp Kids" || title === "PRO" ? "pb-1" : "pb-8"
          } pt-4`}
        >
          {isYearly && yearlyPrice && monthlyPrice ? (
            <div className="flex justify-between">
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                {title}
              </CardTitle>
              <div
                className={cn(
                  "h-fit rounded-xl bg-zinc-200 px-2.5 py-1 text-sm text-black dark:bg-zinc-800 dark:text-white",
                  {
                    "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ":
                      popular,
                  }
                )}
              >
                Save ₾{Number(monthlyPrice) * 12 - Number(yearlyPrice)}
              </div>
            </div>
          ) : (
            <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
              {title}
            </CardTitle>
          )}
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">
              {yearlyPrice && isYearly
                ? "₾" + yearlyPrice
                : monthlyPrice
                ? "₾" + monthlyPrice
                : "Custom"}
            </h3>
            <span className="mb-1 flex flex-col justify-end text-sm">
              {yearlyPrice && isYearly
                ? "/year"
                : monthlyPrice
                ? "/თვეში"
                : null}
            </span>
          </div>
          <CardDescription className="h-12 pt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {title !== "უფასო" ? (
            <ProgramDropdownSelector
              selectedProgram={selectedProgram}
              onProgramSelect={setSelectedProgram}
            />
          ) : (
            ""
          )}
          <h1>{title}</h1>
          {features &&
            Array.isArray(features) &&
            features.map((feature: string | ReactNode, index: number) => (
              <CheckItem key={index} text={feature} />
            ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2 flex flex-col gap-3">
        <Button
          onClick={handleRegistartion}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-teal-600 dark:text-white"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          რეგისტრაცია
        </Button>
        <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black">
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}

const CheckItem = ({ text }: { text: string | React.ReactNode }) => (
  <div className="flex gap-2">
    <div className="my-auto">
      <CheckCircle2 size={18} className="my-auto text-green-400" />
    </div>
    <span className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
      {text}
    </span>
  </div>
)

export default function PricingCardComponent() {
  const plans = [
    {
      title: "უფასო",
      monthlyPrice: "0",
      yearlyPrice: "0",
      description: "დაიწყე პროგრამირების სწავლა უფასოდ",
      features: ["გასაჯაროებული ლექციები JavaScript,React,Python "],
      actionLabel: "ვრცლად",
    },
    {
      title: "საერთო სამენტორო",
      monthlyPrice: 100,
      yearlyPrice: "?",
      description: "გახდი Front-end/Back-end დეველოპერი თვეში 100 ლარად",
      features: [
        "კვირაში ერთი თეორიული და ორი პრაქტიკული სემინარი",
        "მენტორის მომსახურეობა კვირაში სამჯერ 2 საათით",
      ],
      actionLabel: "ვრცლად",
    },
    {
      title: "პირადი მენტორი",
      monthlyPrice: 350,
      yearlyPrice: "?",
      description: "აიყვანე პირადი მენტორი",
      features: [
        "თეორიული და პრაქტიკული სემინარები",
        "ყოველდღიური კომუნიკაცია მენტორთან",
      ],
      actionLabel: "ვრცლად",
      popular: true,
    },
    // {
    //   title: "PRO",
    //   monthlyPrice: 2000,
    //   description: "PRO - სუპერ ინტენსიური პროგრამა",
    //   features: [
    //     "10 საათიანი სამენტორო მომსახურება მთელი დღის განმალვობაში",
    //     "რეზიუმეს/CV - ს და სამოტივაციო წერილის მომზადებაში დახმარებ",
    //     "რეალურ პროექტში ჩართვის შესაძლებლობა",
    //     "საკუთარი სტარტაპის წამოწყების შესაძლებლობა",
    //   ],
    //   actionLabel: "ვრცლად",
    //   exclusive: true,
    // },
  ]
  const kidsPlan = [
    {
      title: "BitCamp Kids",
      monthlyPrice: "50",
      yearlyPrice: "0",
      description: "დაიწყე პროგრამირების სწავლა უფასოდ",
      features: ["გასაჯაროებული ლექციები JavaScript,React,Python "],
      actionLabel: "ვრცლად",
    },
  ]
  return (
    <div className="py-8">
      <PricingHeader
        title="მომსახურებები და საფასური"
        subtitle="აირჩიე სასურველი"
      />
      <section className="mt-8 flex flex-col gap-4  md:flex-row lg:flex-row ">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />
        })}
        {/* {kidsPlan.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />
        })} */}
      </section>
    </div>
  )
}
