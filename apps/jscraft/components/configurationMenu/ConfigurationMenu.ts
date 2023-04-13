import Vue from "vue";
import BoxButton from "~/components/boxButton/BoxButton";
import BoxText from "~/components/boxText/BoxText";
import BoxToggle from "~/components/boxToggle/BoxToggle";

export default Vue.extend({
  components: {
    BoxButton,
    BoxText,
    BoxToggle
  },
  props: {
    isCreativeMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      modelsAvailables: [] as string[],
      texturePacksAvailables: [] as string[]
    }
  },
  created() {
    [
      'clouds',
      'grass',
      'trees',
      'texture',
      'render-object'
    ].forEach((configKey) => {
      if(true) {
        switch(configKey) {
          case 'clouds':
          case 'grass':
          case 'trees':
            localStorage.setItem(configKey, 'true');
            break;
          case 'texture':
            localStorage.setItem(configKey, 'classic');
            break;
          case 'render-object':
            localStorage.setItem(configKey, 'house');
            break;
        }
      }
    })
  },
  mounted() {
    this.modelsAvailables = [
      "Home",
      "Jungle Temple"
    ];

    this.texturePacksAvailables = [
      "Classic",
      "Softer"
    ];
  },
  methods: {
    onToggle(name: string, value: any) {
      this.$store.commit(`config/set${name}`, value);
    }
  }
})
