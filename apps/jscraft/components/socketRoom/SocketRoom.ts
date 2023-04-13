import Vue from 'vue';

interface IMessage {
  user: string;
  message: string;
}

export default Vue.extend({
  data() {
    return {
      messageHistory: [] as IMessage[]
    };
  },
  created() {
    this.$root.$on('socket-message', (message: IMessage) => {
      if(this.messageHistory.length > 2) {
        this.messageHistory.shift();
        this.messageHistory.push({
          user: message.user.slice(0,6),
          message: message.message
        });
      } else {
        this.messageHistory.push({
          user: message.user.slice(0,6),
          message: message.message
        });
      }
    })
  }
})
