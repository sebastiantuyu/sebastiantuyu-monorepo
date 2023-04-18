import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightFromBracket, faBox, faGear, faHouse, faPenClip, faReceipt } from '@fortawesome/free-solid-svg-icons';

library.add(faPenClip, faGear, faArrowRightFromBracket, faHouse, faReceipt, faBox);
export default Vue.extend({
  name: 'IndexPage',
  middleware: ['auth'],
  components: {
    FontAwesomeIcon,
  },
  methods: {
    async logout() {
      await (this as any).$auth.logout();
      this.$router.push('/login');
    },
    hover() {

    }
  }
})
