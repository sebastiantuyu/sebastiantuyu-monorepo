<template>
  <div>
    <h1>
      Contact
    </h1>

    <div class="abstract">
      <h2>Information</h2>
        Please, if you have any questions regarding my projects send me a DM or an email through the following social media links.
      <h2>
        contact@sebastiantuyu.com
      </h2>
    </div>

      <div class="items-content">
        <a
          v-for="(item, idx) of socialMedia"
          :key="idx"
          :href="item.url"
        >
          <font-awesome-icon
            :icon="['fab', item.nameCode]"
            size="3x"
          />
        </a>
      </div>
  </div>
</template>

<style>
  .items-content {
    left: 0;
    right: 0;
    margin: 15px auto;
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

[
  faGithub,
  faLinkedin,
  faTwitter
].forEach((n) => library.add(n));

export default Vue.extend({
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      socialMedia: [
        {
          nameCode: 'github',
          url: 'https://github.com/sebastiantuyu'
        },
        {
          nameCode: 'linkedin',
          url: 'https://www.linkedin.com/in/sebastian-tuyu/'
        }
      ]
    }
  }
})
</script>
