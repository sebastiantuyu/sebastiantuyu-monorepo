import Vue from "vue";

export default Vue.extend({
  props: {
    options: Array
  },
  data() {
    return {
      current: 0,
    }
  },
  computed: {
    optionDisplayed(): string {
      try {
        return (this as any).options[this.current];
      } catch {
        return '';
      }
    }
  },
  methods: {
    switchOptions() {
      this.current = (this.current + 1) % this.options.length;
      this.$emit('changed', this.optionDisplayed);
    }
  }
});
