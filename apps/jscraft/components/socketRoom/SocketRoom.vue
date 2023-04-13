<template>
  <div class="sk-chat-io">
    <div
      class="sk-chat-io__messages"
      v-for="(msg, index) in messageHistory"
      :key="index"
    >
    <span class="usr">{{msg.user}}</span>
    <span class="msg">{{msg.message}}</span>
    </div>
  </div>
</template>

<style scoped>
  .sk-chat-io {
    width: 380px;
    height: calc(40px * 3);
    overflow: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    display: flex;
    flex-direction: column-reverse;
  }

  .sk-chat-io__messages {
    height: 40px;
    font-size: 35px;
    padding: 0 0 0 15px;
    background: rgba(0, 0, 0, 0.9);
  }

  .usr {
    color: #bd6925;
  }

  .msg {
    color: white;
  }

  .sk-chat-io::-webkit-scrollbar {
    display: none;
  }
</style>

<script src="./SocketRoom.ts" lang="ts"></script>
