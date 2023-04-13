import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      firstClick: true,
      offsetX: 0,
      offsetY: 0,
      height: 0,
      width: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // eslint-disable-next-line no-undef
      this.width = (this.$refs.walk as HTMLElement).clientWidth;
      // eslint-disable-next-line no-undef
      this.height = (this.$refs.walk as HTMLElement).clientHeight;
    });
  },
  methods: {
    mapPosition(ev: any, target: string) {
      // ev.offestY
      // ev.offestX
      this.$root.$emit(`joystick-${target}`, (ev.offsetX, ev.offsetY));
    }
  }
});
