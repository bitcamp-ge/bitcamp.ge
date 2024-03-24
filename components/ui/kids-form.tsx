"use client"

import React, { ReactElement } from "react"
import Link from "next/link"
import { IntentItem } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Icons } from "../icons"
import { Button } from "./button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export function KidsForm({ form }: { form: any }) {
  return (
    <>
      <br />
      <FormField
        control={form.control}
        name="kidsform.age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>აირჩიეთ ასაკი(სავალდებულოა)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="აირჩიეთ ასაკი" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="7-10">7-10 წელი</SelectItem>
                <SelectItem value="11-14">11-14 წელი</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="kidsform.availability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>აირჩიეთ დრო(სავალდებულოა)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="აირჩიეთ დრო" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ორშაბათი, ოთხშაბათი, პარასკევი 10:00 - 13:00">
                  ორშაბათი, ოთხშაბათი, პარასკევი 10:00 - 13:00
                </SelectItem>
                <SelectItem value="ორშაბათი, ოთხშაბათი, პარასკევი 16:00 - 19:00">
                  ორშაბათი, ოთხშაბათი, პარასკევი 16:00 - 19:00
                </SelectItem>
                <SelectItem value="ორშაბათი, ოთხშაბათი, პარასკევი 19:00 - 22:00">
                  ორშაბათი, ოთხშაბათი, პარასკევი 19:00 - 22:00
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
