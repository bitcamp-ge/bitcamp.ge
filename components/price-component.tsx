"use client"

import React, { ReactNode, useEffect, useState } from "react"
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
import { useSession } from "next-auth/react"
import local from "next/font/local"
import { useRouter } from "next/router"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { services } from "@/config/site"


type PricingCardProps = {
  machine_name: string
  isYearly?: boolean
  title: string
  monthlyPrice?: number | string
  yearlyPrice?: number | string
  description: string
  features: Array<{ text: string | ReactNode, checked?: boolean, crossed?: boolean }>
  actionLabel: string
  loggedInActionLabel: string
  actionData?: any,
  popular?: boolean,
  exclusive?: boolean,
  disabled?: boolean,
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

const getFilterByIntent = (intent) => {
  switch (intent) {
    case "pro":
      return ["pro", "private", "common", "minimal", "kids"]
    case "common":
      return ["common", "private", "minimal", "kids", "pro"]
    case "minimal":
      return ["minimal", "private", "common", "kids", "pro"]
    case "private":
      return ["private", "common", "minimal", "kids", "pro"]
    case "kids":
      return ["kids", "common", "private", "minimal", "pro"]
    default:
      return ["free", "minimal", "common", "private", "kids", "pro"]
  }
}


const PricingCard = ({
  machine_name,
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  loggedInActionLabel,
  actionData,
  popular,
  exclusive,
  disabled
}: PricingCardProps) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);
  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const { status, data } = useSession();

  const startEnrollment = async () => {
    localStorage.setItem("intent", machine_name);
    window.location.href = "/dashboard";
  }

  // In case it's popular
  let borderColor = popular ? "border-green-500 ring-4 ring-green-500" : "border-zinc-700";
  // In case it's for kids
  borderColor = machine_name === "kids" ? "border-violet-700" : borderColor;

  return (
    <Card
      className={cn(
        `flex w-full ${title === "BitCamp Kids" || title === "PRO"
        } flex-col justify-between py-1 ${borderColor} mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
            exclusive,
        }
      )}
    >
      <div>

        {machine_name != "kids" && (
          <CardHeader
            className={`w-full ${title === "BitCamp Kids" || title === "PRO" ? "pb-1" : "pb-8"
              } pt-4`}
          >
            <>
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                {title}
              </CardTitle>
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
            </>
          </CardHeader>
        )}

        {machine_name === "kids" && (
          <div className="relative flex flex-row">
            <CardHeader
              className={`w-full ${title === "BitCamp Kids" || title === "PRO" ? "pb-1" : "pb-8"
                } pt-4`}
            >
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                {title}
              </CardTitle>
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
            <img className="absolute right-1 h-28 sm:h-60 md:h-96" src="/images/astro-laptop.png" />
          </div>
        )}

        <CardContent className="flex flex-col gap-2">
          {features &&
            Array.isArray(features) &&
            features.map((feature, index) => {
              if (feature.checked) {
                return (<CheckItem key={index} text={feature.text} />)
              }

              if (feature.crossed) {
                return (<CrossItem key={index} text={feature.text} />)
              }
            })}
        </CardContent>
      </div>
      {!disabled && (
        <CardFooter className="mt-2">
          {status === 'authenticated'
            ? (<Button className="bg-green-700 text-white" onClick={() => {
              startEnrollment()
            }}>
              {loggedInActionLabel}
            </Button>)
            : (
              <>
                <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black px-6 font-medium text-white transition-colors  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-white dark:text-black" variant="outline" onClick={toggleSignUpModal}>{actionLabel}</Button>

                <ModalDrawer
                  content={<UserAuthForm showAdditionalFields={true} />}
                  modalTitle="რეგისტრაცია"
                  modalDescription={"გთხოვთ შეიყვანოთ თქვენი მონაცემები"}
                  open={isSignUpModalOpen}
                  setOpen={setIsSignUpModalOpen}
                />
              </>

            )
          }
        </CardFooter>
      )}
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

const CrossItem = ({ text }: { text: string | React.ReactNode }) => (
  <div className="flex gap-2">
    <div className="my-auto">
      <CrossCircledIcon className="my-auto text-red-400" />
    </div>
    <span className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
      {text}
    </span>
  </div>
)

interface PricingCardComponentProps {
  intent?: string
}


export default function PricingCardComponent({ intent }: PricingCardComponentProps) {
  let [filter, setFilter] = React.useState<string[]>([]);

  useEffect(() => {
    const getIntent = () => {
      return localStorage.getItem("intent") || "free"
    }

    if (intent) {
      localStorage.setItem("intent", intent)
    }

    setFilter(getFilterByIntent(getIntent()));
  }, []);

  const filteredservices = filter?.map((machineName) => {
    const plan = services.find((p) => p.machine_name === machineName);
    if (plan) {
      return plan;
    }
    return null;
  })

  let sections: [any] = [{ width: 'full', services: [] }];
  let sectionIndex = 0;

  if (filteredservices) {
    for (let plan of filteredservices) {
      if (plan?.machine_name === 'pro' || plan?.machine_name === 'kids') {
        sectionIndex++;
        sections[sectionIndex] = { width: 'full', services: [plan] };
        sectionIndex++;
      } else {
        if (!sections[sectionIndex]) sections[sectionIndex] = { width: 'col', services: [] };
        sections[sectionIndex].services.push(plan);
      }
    }
  }

  const finalSections = sections.filter((section) => Object.keys(section).length > 0);


  return (
    <div className="py-8">
      <div className="flex w-full flex-col gap-4 md:max-w-[58rem]">
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
            {section.services.map((plan) => {
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


