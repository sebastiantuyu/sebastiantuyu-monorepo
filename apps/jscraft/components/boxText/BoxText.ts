import Vue from "vue";

export default Vue.extend({
  name: "BoxText",
  props: {
    placeholder: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.username = localStorage.getItem('username') || "";
    })
  },
  watch: {
    username(newValue: string) {
      if(this.username.length <= 10) {
        localStorage.setItem('username', newValue);
        this.$emit('input', newValue);
      }
    }
  }
});
