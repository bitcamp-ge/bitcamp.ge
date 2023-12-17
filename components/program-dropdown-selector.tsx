import React, { ChangeEvent, useState } from "react"

import { programs } from "@/config/programs"

interface ProgramDropdownSelector {
  onProgramSelect: React.Dispatch<React.SetStateAction<string>>
  selectedProgram: string | null
}

export default function ProgramDropdownSelector({
  onProgramSelect,
  selectedProgram,
}: ProgramDropdownSelector) {
  const handleProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onProgramSelect(e.target.value)
  }

  return (
    <select
      name="dog-names"
      id="dog-names"
      className="cursor-pointer appearance-none rounded-lg border bg-popover p-2 "
      onChange={handleProgramChange}
      value={selectedProgram || ""}
    >
      <option value="">აირჩიეთ პროგრამა</option>
      {programs.map((program) => {
        if (program.name === "BitCamp Kids" || program.name === "PRO") return

        return <option value={program.badge}>{program.badge}</option>
      })}
    </select>
  )
}
