# Twilio Conversations x Vue.js demo chat app

This is a basic demo chat app made with [Twilio Conversations API](https://www.twilio.com/conversations-api) and [Vue.js](https://vuejs.org/).

## Start the app

1. Install the dependencies by executing this command:

```
npm install
```

2. Create a `.env` file and add these environment variables:

```
TWILIO_ACCOUNT_SID=XXXXX
TWILIO_API_KEY=XXXXX
TWILIO_API_SECRET=XXXXX
TWILIO_SERVICE_SID=XXXXX
```
`XXXXX` indicates credentials you'll need for this app. The table below summarizes each item and shows where you can find the credentials. Replace `XXXXX` with your own credentials.

| Credential | Description | Steps to obtain the credential |
|---|---|---|
| TWILIO_ACCOUNT_SID | Account SID. Account SID is a combination of numbers and alphabets that uniquely identifies an account. By combining Account SID and Authentication Token, it can be used as authentication information to call APIs. | Login to the [Twilio Console](https://twilio.com/console) and locate the Account SID. |
| TWILIO_API_KEY | API Key. API Key is a key that represents the required credentials to access the Twilio API. It authenticates with Twilio's API and creates and revokes access tokens. | Access Twilio Console's [API Key](https://www.twilio.com/console/project/api-keys) page. Click the red plus symbol. Enter a key name in the **FRIENDLY NAME** field and set **KEY TYPE** to `standard`. Click **Create API Key**. You'll see **SID** and **SECRET** on the screen. **SID** is your API Key. <br /> :warning: If you leave this screen, you will never be able to access your **SECRET** again. Copy and save the value before closing the screen.|
| TWILIO_API_SECRET | API Key secret. API Key secret is a secret that is attached to an API key. It is used to sign access tokens. | The API Key secret is **SECRET** shown when you create an API Key.  |
| TWILIO_SERVICE_SID | Service SID. Service SID is a combination of numbers and alphabets that uniquely identifies a [Service](https://www.twilio.com/docs/chat/rest/service-resource). | Access [Conversations](https://www.twilio.com/console/conversations) in the Twilio Console. Click on **Manage** > **Services** > **Create a new service**. When a new screen appears, enter enter a recognizable service name such as "vue-conversations". The Service SID is **Service SID** on the screen. |

Save the file.

3. Open the `server.js` file and uncomment these 2 lines and save the file.
   
```javascript
// getAccessToken("User1")
// getAccessToken("User2")
```

1. Run the server by executing this command:

```
node server.js
```
You should see the access tokens for `User1` and `User2`, as well as `Example app listening at http://localhost:5000`.

5. Comment these 2 lines again and save the file.

```javascript
// getAccessToken("User1")
// getAccessToken("User2")
```
6. Run the app by executing this command:

```
npm run serve
```
