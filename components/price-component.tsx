"use client"

import React, { ReactNode } from "react"
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
import { pl } from "date-fns/locale"


import { ModalDrawer } from "./modal-drawer"
import { UserAuthForm } from "./user-auth-form"
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
}: PricingCardProps) => (
  <Card
    className={cn(
      `flex w-full ${title === "BitCamp Kids" || title === "PRO"
      } flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"
      } mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
          exclusive,
      }
    )}
  >
    <div>
      <CardHeader
        className={`w-full ${title === "BitCamp Kids" || title === "PRO" ? "pb-1" : "pb-8"
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
            {yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/თვეში" : null}
          </span>
        </div>
        <CardDescription className="h-12 pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features &&
          Array.isArray(features) &&
          features.map((feature: string | ReactNode, index: number) => (
            <CheckItem key={index} text={feature} />
          ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">

    <ModalDrawer 
      content={<UserAuthForm showAdditionalFields={true}/>} 
      triggerButtonLabel="რეგისტრაცია"
      
    />
    </CardFooter>
  </Card>
)

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

type PricingCardComponentProps = {
  filter?: string[]
}

export default function PricingCardComponent({ filter }: PricingCardComponentProps) {
  const plans = [
    {
      machine_name: "free",
      title: "უფასო",
      monthlyPrice: "0",
      yearlyPrice: "0",
      description: "დაიწყე პროგრამირების სწავლა უფასოდ",
      features: ["გასაჯაროებული ლექციები JavaScript,React,Python "],
      actionLabel: "ვრცლად",
    },
    {
      machine_name: "common",
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
      machine_name: "private",
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
    {
      machine_name: "pro",
      title: "PRO",
      monthlyPrice: 2000,
      description: "PRO - სუპერ ინტენსიური პროგრამა",
      features: [
        "10 საათიანი სამენტორო მომსახურება მთელი დღის განმალვობაში",
        "რეზიუმეს/CV - ს და სამოტივაციო წერილის მომზადებაში დახმარებ",
        "რეალურ პროექტში ჩართვის შესაძლებლობა",
        "საკუთარი სტარტაპის წამოწყების შესაძლებლობა",
      ],
      actionLabel: "ვრცლად",
      exclusive: true,
    },
    {
      machine_name: "kids",
      title: "BitCamp Kids",
      monthlyPrice: "50",
      yearlyPrice: "0",
      description: "დაიწყე პროგრამირების სწავლა უფასოდ",
      features: ["გასაჯაროებული ლექციები JavaScript,React,Python "],
      actionLabel: "ვრცლად",
    },
  ];

  const filteredPlans = filter?.map((machineName) => {
    const plan = plans.find((p) => p.machine_name === machineName);
    if (plan) {
      return plan;
    }
    return null;
  })


  let sections: [any] = [{width: 'full', plans: []}];
  let sectionIndex = 0;

  if (filteredPlans){
    for (let plan of filteredPlans) {
      if (plan?.machine_name === 'pro' || plan?.machine_name === 'kids') {
        sectionIndex++;
        sections[sectionIndex] = {width: 'full', plans: [plan]};
        sectionIndex++;
      } else {
        if(!sections[sectionIndex]) sections[sectionIndex] = {width: 'col', plans: []};
        sections[sectionIndex].plans.push(plan);
      }
    }
  }

  const finalSections = sections.filter((section) => Object.keys(section).length > 0);

  console.log(finalSections);

  return (
    <div className="py-8">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          BitCamp - ის სერვისები
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          შეარჩიე შენთვის კომფორტული მომსახურება და დაიწყე პროგრამირების სწავლა.
        </p>
      </div>

      {finalSections.map((section) => {
        return (
          <section className="mt-8 flex flex-col gap-4  md:flex-row lg:flex-row ">
            {section.plans.map((plan) => {
              if (plan) {
                return (
                  <PricingCard
                    key={plan.machine_name}
                    {...plan}
                  />
                )
              }
              return null;
            })}
          </section>
        )
      })}


    </div>
  )
}
