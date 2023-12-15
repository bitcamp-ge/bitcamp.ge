"use client"

import { ChangeEvent, FormEvent, useRef, useState } from "react"

const PaymentForm = () => {
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0])
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!file) return

    try {
      const data = new FormData()
      data.set("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      // Handle Error
      if (!res.ok) throw new Error(await res.text())

      // Clear the input value
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setFile(undefined) // Reset file state
    } catch (e: any) {}
  }

  return (
    <div>
      <h2>Upload Payment Receipt</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="file" // Define accepted file types
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default PaymentForm
