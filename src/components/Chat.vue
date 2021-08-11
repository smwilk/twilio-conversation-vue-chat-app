<template>
  <div class="hello">
    <h1>Welcome to the Vue chat app<span v-if="nameRegistered">, {{ name }}</span>!</h1>
    <p>{{ statusString }}</p>
    <div v-if="!nameRegistered">
      <input @keyup.enter="registerName" v-model="name" placeholder="Enter your name">
      <button @click="registerName">Register name</button>
    </div>
    <div v-if="nameRegistered && !activeConversation">
      <input @keyup.enter="joinConversation" v-model="chatName" placeholder="Enter your chat name">
      <button @click="joinConversation">Join chat</button>
    </div>
    <h2>{{ activeConversation?.uniqueName }}</h2>
    <Conversation v-if="activeConversation" :active-conversation="activeConversation" :name="name" />
  </div>
</template>

<script>

import {Client as ConversationsClient} from "@twilio/conversations"
import Conversation from "./Conversation"

export default {
	name: "Chat",
	components: { Conversation },
	data() {
		return {
			statusString: "",
			activeConversation: null,
			chatName: "",
			name: "",
			nameRegistered: false
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
		joinConversation: async function() {
			try {
				const newConversation = await this.conversationsClient.createConversation({uniqueName: this.chatName})
				const joinedConversation = await newConversation.join().catch(err => console.log(err))
				await joinedConversation.add("Sample user").catch(err => console.log(err))

				this.activeConversation = joinedConversation
			} catch (err) {
				this.activeConversation = await (this.conversationsClient.getConversationByUniqueName(this.chatName))
			}
		},
		getToken: async function(identity) {
			const response = await fetch(`http://localhost:5000/auth/user/${identity}`)
			const responseJson = await response.json()
			return responseJson.token
		},
		registerName: async function() {
			await this.initConversationsClient()
			this.nameRegistered = true
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
