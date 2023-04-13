<template>
  <div>
    <h1>
      Thoughts
    </h1>

    <div class="abstract">
      <h2>Why?</h2>
Here is where you can find all my ideas, and of course, my thoughts. I usually like to share things I have learned in the past years.
    </div>

    <nav role="navigation" class="toc">
      <h2>Content</h2>
      <ol>
        <li
          v-for="(item, key) of items"
          :key="key"
        >
          <a
            :href="item.url"
          >
            {{ item.title }}
          </a>
        </li>
      </ol>
    </nav>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchBlog, fetchMediumBlog } from '@/src/utils/fetchMediumBlog';

export default Vue.extend({
  head: {
    title: 'Thoughts'
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    fetchBlog()
    .then((content) => {
      this.items = content.map((a: any) => {
        a.url = `/thoughts/p/${a.suid}`;
        return a;
      });
    });
  }
})
</script>
