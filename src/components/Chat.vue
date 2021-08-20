<template>
  <div id="chat">
    <h1>Welcome to the Vue chat app<span v-if="nameRegistered">, {{ name }}</span>!</h1>
    <p>{{ statusString }}</p>
    <div v-if="!nameRegistered">
      <input @keyup.enter="registerName" v-model="name" placeholder="Enter your name">
      <button @click="registerName">Register name</button>
    </div>
    <div v-if="nameRegistered && !activeConversation && isConnected">
      <button @click="createConversation">Join chat</button>
    </div>
    <Conversation v-if="activeConversation" :active-conversation="activeConversation" :name="name" />
  </div>
</template>

<script>
import {Client as ConversationsClient} from "@twilio/conversations"
import Conversation from "./Conversation"

export default {
	components: { Conversation },
	data() {
		return {
			statusString: "",
			activeConversation: null,
			name: "",
			nameRegistered: false,
			isConnected: false
		}
	},
	methods: {
		initConversationsClient: async function() {
			window.conversationsClient = ConversationsClient
			const token = await this.getToken(this.name)
			this.conversationsClient = await ConversationsClient.create(token)
			this.statusString = "Connecting to Twilio…"
			this.conversationsClient.on("connectionStateChanged", (state) => {
				switch (state) {
				case "connected":
					this.statusString = "You are connected."
					this.isConnected = true
					break
				case "disconnecting":
					this.statusString = "Disconnecting from Twilio…"
					break
				case "disconnected":
					this.statusString = "Disconnected."
					break
				case "denied":
					this.statusString = "Failed to connect."
					break
				}
			})
		},
		getToken: async function(identity) {
			const response = await fetch(`http://localhost:5000/auth/user/${identity}`)
			const responseJson = await response.json()
			return responseJson.token
		},
		registerName: async function() {
			this.nameRegistered = true
			await this.initConversationsClient()
		},
		createConversation: async function() {
			// Ensure User1 and User2 have an open client session
			try {
				await this.conversationsClient.getUser("User1")
				await this.conversationsClient.getUser("User2")
			} catch {
				console.error("Waiting for User1 and User2 client sessions")
				return
			}
			// Try to create a new conversation and add User1 and User2
			// If it already exists, join instead
			try {
				const newConversation = await this.conversationsClient.createConversation({uniqueName: "chat"})
				const joinedConversation = await newConversation.join().catch(err => console.log(err))
				await joinedConversation.add("User1").catch(err => console.log("error: ", err))
				await joinedConversation.add("User2").catch(err => console.log("error: ", err))
				this.activeConversation = joinedConversation
			} catch {
				this.activeConversation = await (this.conversationsClient.getConversationByUniqueName("chat"))
			}
		}
	}
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
