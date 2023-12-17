import React, { ChangeEvent, useState } from "react"

export default function ServiceDropdownSelector() {
  const [selectService, setSelectService] = useState(
    localStorage.getItem("selectedTitle")
  )

  const handleServiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectService(e.target.value)
  }

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
  ]

  return (
    <select
      name="dog-names"
      id="dog-names"
      className="cursor-pointer appearance-none rounded-lg border bg-popover p-2 "
      onChange={handleServiceChange}
      value={selectService || ""}
    >
      <option value="">აირჩიეთ სერვისი</option>
      {plans.map((plan) => {
        if (plan.title === "უფასო") return

        return <option value={plan.title}>{plan.title}</option>
      })}
    </select>
  )
}
