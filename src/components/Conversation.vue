<template>
	<div id="conversation">
		<div class="conversation-container">
			<div 
				v-for="message in messages" :key="message.index"
				class="bubble-container"
				:class="{ myMessage: message?.state?.author === name }"
			>
				<div class="bubble">
					<div class="name">{{ message?.state?.author }}:</div>
					<div class="message">{{ message?.state?.body }}</div>
				</div>
			</div>
		</div>
		<div class="input-container">
			<input @keyup.enter="sendMessage" v-model="messageText" placeholder="Enter your message">
			<button @click="sendMessage">Send message</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["activeConversation", "name"],
	data() {
		return {
			messages: [],
			messageText: "",
			isSignedInUser: false
		}
	},
	mounted() {
		this.activeConversation.getMessages()
			.then((newMessages) => {
				this.messages = [...this.messages, ...newMessages.items]
			})
		this.activeConversation.on("messageAdded", (message) => {
			this.messages = [...this.messages, message]
		})
	},
	methods: {
		sendMessage: function() {
			this.activeConversation.sendMessage(this.messageText)
				.then(() => {
					this.messageText = ""
				})
		}
	}
}
</script>

<style scoped>
.conversation-container {
  margin: 0 auto;
  max-width: 400px;
  height: 600px;
  padding: 0 20px;
  border: 3px solid #f1f1f1;
  overflow: scroll;
}

.bubble-container {
	text-align: left;
}

.bubble {
  border: 2px solid #f1f1f1;
  background-color: #fdfbfa;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
	width: 230px;
	float: right;
}

.myMessage .bubble {
	background-color: #abf1ea;
	border: 2px solid #87E0D7;
	float: left;
}

.name {
  padding-right: 8px;
	font-size: 11px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>