import { client } from "lib/prereg"

export async function POST(request) {
  const res = await request.json()
  const {
    marketingEmailAddress,
    subjectName,
    firstName,
    lastName,
    email,
    mobile,
    message,
  } = res

  client.sendEmail({
    From: "oto@bitcamp.ge",
    To: `${
      marketingEmailAddress
        ? marketingEmailAddress
        : process.env.MARKETING_EMAIL_ADDRESS
    }`,
    Subject: "რეგისტრაცია",
    TextBody: `სახელი: ${firstName} ${lastName}\nმაილი: ${email}\nტელეფონის ნომერი: ${mobile}\nმესიჯი: ${message}\nგვერდი: ${subjectName}`,
  })

  return Response.json({ res })
}
