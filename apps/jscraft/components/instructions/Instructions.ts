import Vue from "vue";
import BoxButton from "../boxButton/BoxButton";

export default Vue.extend({
  components: {
    BoxButton
  },
  name: "Instructions",
  data() {
    return {
      iState: true
    }
  },
  created() {
    this.$root.$on('toggle-instructions', () => {
      this.iState = !this.iState;
    });
  }
});
