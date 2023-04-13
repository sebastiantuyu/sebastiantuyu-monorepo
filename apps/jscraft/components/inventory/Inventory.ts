import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      activeElement: 0,
      inventory: [
        {
          itemSrc: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1647959066/portfolio/grass__side_ittaq5.png'
        },
        {
          itemSrc: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1647907409/portfolio/dirt_wxriqe.png'
        },
        {
          itemSrc: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1650513644/portfolio/sand_nvqklu.png'
        },
        {
          itemSrc: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1647907409/portfolio/stone_zpl24t.png'
        },
        {
          itemSrc: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1647959066/portfolio/wood_zkyovj.jpg'
        }
      ]
    };
  },
  created() {
    this.$root.$on("change-inventory-element", (delta: number) => {
      this.activeElement = (delta > 0 ? this.activeElement + 1 : this.activeElement - 1) % this.inventory.length;
      this.$store.commit('creative/setmaterial', this.activeElement);
    });
  }
});
