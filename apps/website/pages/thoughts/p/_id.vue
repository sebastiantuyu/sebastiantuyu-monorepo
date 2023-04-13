<template>
  <div>
    <h1>
    {{ title }}
  </h1>

  <div v-html="thumbnail"></div>
  </div>
</template>

<style>
  figcaption {
    color: gray;
    text-align: center;
  }

  blockquote {
    font-style: italic;
  }

  pre {
    position: relative;
  }

  pre p {
    margin: 0 !important;
  }

  pre cc {
    position: absolute;
    right: 15px;
    top: 15px;
    display: block;
    border: 1.5px solid #d3d3d3;
    padding: 5px 15px;
    border-radius: 6px;
  }

  @media screen and (max-width: 720px) {
    body {
      max-width: 90% !important;
    }
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { fetchBlog } from '@/src/utils/fetchMediumBlog';
import { generateOGImage } from '@/src/utils/ogImage';


export default Vue.extend({
  data() {
    return {
      blogIndex: -1,
      title: '',
      thumbnail: ''
    };
  },
  asyncData({ payload }) {
    if(payload) {
      return {
        title: payload.title,
        thumbnail: payload.content
      }
    }
  },
  head(): any {
    const ogImage = generateOGImage(this.title);
    return {
      title: this.title,
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogImage
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title
        },
      ]
    }
  },
  mounted() {
    fetchBlog(this.$route.params.id)
    .then((rContent) => {
      this.title = rContent[0].title;
      this.thumbnail = rContent[0].content;
    });
  }
})
</script>
