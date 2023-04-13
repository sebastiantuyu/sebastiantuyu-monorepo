import Vue from "vue";

export default Vue.extend({
  name: "BoxButton",
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
