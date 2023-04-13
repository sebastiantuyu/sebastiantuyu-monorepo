import Vue from "vue";
import BoxButton from "../boxButton/BoxButton";

export default Vue.extend({
  name: "DeadScreen",
  components: {
    BoxButton
  },
  data() {
    return {
      username: localStorage.getItem('username') || '',
    }
  },
  methods: {
    restart() {
      location.reload();
    }
  }
});
