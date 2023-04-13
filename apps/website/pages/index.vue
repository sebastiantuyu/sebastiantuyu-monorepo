<template>
  <div class="main">
    <div class="cover">
      <div>
        <h1>
          Sebastian Tuyu
        </h1>
      </div>
      <div class="content">
        <div class="item"
          @click="$router.replace('/contact')"
        >
          <h4>Contact</h4>
        </div>

        <!-- <div class="item"
          @click="switchSubdomain('accelerator')"
        >
          <h4 style="text-align:center">Angel Investing</h4>
        </div> -->

        <div class="item"
          @click="$router.replace('/resume')"
        >
          <h4>Resume</h4>
        </div>

        <div class="item"
          @click="$router.replace('/thoughts')"
        >
          <h4>Thoughts</h4>
        </div>

        <div
          class="item"
          @click="$router.replace('/projects')"
        >
          <h4>Projects</h4>
        </div>
      </div>

      <div
        class="view-more"
        :style="`opacity: ${scrollerOpactiy};`"
      >
        <span>
          Scroll down
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
      </div>
    </div>
    <div class="timeline">
      <h2>
        Recent projects
      </h2>

      <div class="project">
        <h4>
          Javascraft
        </h4>
        <p><pre style="text-align:center"><a href="https://js.sebastiantuyu.com">js.sebastiantuyu.com</a></pre></p>
        <p>
          A lightweight version of the classic Minecraft videogame for browser. It allows you to explore a mini-world pseudo-random generated.
        </p>
        <p></p>
        <img src="https://cdn.sebastiantuyu.com/js_house.webp" alt="">
        <h4>Multiplayer</h4>
        <p>
          Javascraft allows people to hang with each other to build things together, powered trhought websockets. Are you ready to invite your friends to have a great time?
        </p>
        <p></p>
        <img src="https://cdn.sebastiantuyu.com/js_creative.webp" alt="">
        <h4>How Javascraft works?</h4>
        <p>
          JsC is an open-source project, you can check all the documentation (and the code) in to this github repo!
          <pre>https://github.com/sebastiantuyu</pre>
        </p>

      </div>
    </div>
  </div>
</template>

<style>
  body {
    /* margin: 0 !important;
    padding: 0 !important;
    overflow: scroll !important; */
  }

  @media screen and (max-width: 680px) {
    body {
      margin: 0 !important;
      /* padding: 0 !important; */
      overflow: scroll !important;
    }
  }
</style>

<style scoped>

body {

  height: 100vh !important;
}

.main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cover {
  position: relative;
  min-height: 100vh;
  display: flex;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.timeline  {
  min-height: 100vh;
  padding: 10px 25px;
}


.view-more {
  transition: all 200ms;
  opacity: 0.35;
  position: absolute;
  bottom: 45px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}

.view-more svg {
  height: 15px;
}

.content {
  margin: 15px 0;
  display: flex;
  font-size: 16px;
  width: 80%;
  max-width: 800px;
  justify-content: space-around;
}

.content h4 {
  font-weight: 500;
  margin: 0 !important;
}

.item {
  margin: 0 15px;
  cursor: pointer;
}


@media screen and (max-width: 680px) {
  .view-more {
    bottom: 45px;
  }

  .content {
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
  }

  .item {
    margin: 5px 0;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import getMeta from '@/src/utils/getMeta';

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      title: '',
      scrollerOpactiy: 0.35
    }
  },
  head: {
    title: 'Sebastian Tuyu',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Sebastian Tuyu is a experienced software engineer who loves to create, build and invest in new technologies. ' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.onScroll);
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    metaTags(): any {
      return getMeta(this.title);
    }
  },
  methods: {
    onScroll() {
      const _ = scrollY;
      if(_ > 50) {
        this.scrollerOpactiy = 0;
      } else {
        this.scrollerOpactiy = 0.35;
      }
    },
    switchSubdomain(subdomain: string) {
      this.$nextTick(() => {
        const url = new URL(window.location.href);
        url.host = url.host.includes('www')
        ? subdomain + url.host.split('www')[1]
        : subdomain + "." + url.host
        window.location.href = url.toString();
      });
    }
  }
})
</script>
