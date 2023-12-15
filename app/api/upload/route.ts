import { mkdir, writeFile } from "fs"
import { NextRequest, NextResponse } from "next/server"
import { join } from "path"

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const directoryPath = join(".", "tmp")
    const filePath = join(directoryPath, file.name)

    // Check if the directory exists, if not, create it
    mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err)
        return NextResponse.json({ success: false })
      }

      // Write the file to the directory
      writeFile(filePath, buffer, (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr)
          return NextResponse.json({ success: false })
        }
        console.log("File written successfully")
        console.log("The written file has the following contents:")
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
  }
}
