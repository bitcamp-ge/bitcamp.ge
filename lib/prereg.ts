const postmark = require("postmark")

const serverToken = process.env.POSTMARK_API_TOKEN
const client = new postmark.ServerClient(serverToken)

export { client }
