require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const port = 5000

const AccessToken = require("twilio").jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

// Used when generating any kind of tokens
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioApiKey = process.env.TWILIO_API_KEY_SID
const twilioApiSecret = process.env.TWILIO_API_KEY_SECRET

// Used specifically for creating Chat tokens
const serviceSid = process.env.TWILIO_CONVERSATIONS_SERVICE_SID

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
	serviceSid: serviceSid,
})

// Create an access token which we will sign and return to the client,
// containing the grant we just created
function getAccessToken(user) {
	const token = new AccessToken(
		twilioAccountSid,
		twilioApiKey,
		twilioApiSecret,
		{identity: user}
	)
	token.addGrant(chatGrant)
	const jwt = token.toJwt()
	console.log(`Token for ${user}: ${jwt}`)
	return jwt
}

app.get("/auth/user/:user", (req, res) => {
	const jwt = getAccessToken(req.params.user)
	res.send({token: jwt})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
