import axios from 'axios';

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'Sebastian Tuyu',
    script: [
      {
        src: "https://some-website.com/stuff.js",
        body: true
      }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'software, developer, mexico, sebastian, tuyu, engineer, cloud, contact'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/latex.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap',
    ['@nuxtjs/robots', {
      Sitemap: 'https://sebastiantuyu.com/sitemap.xml',
      UserAgent: '*',
      Allow: '/'
    }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  sitemap: {
    hostname: 'https://sebastiantuyu.com',
    lastmod: (new Date()).toISOString().split('T')[0],

  },

  generate: {
    routes: function() {
      return axios.get('https://socket.sebastiantuyu.com/api/b/all').then((res) => {
        console.log(res);
        return res.data.content.map((page) => {
          return {
            route: 'thoughts/p/' + page.suid,
            payload: page
          }
        })
      })
    }
  }
}
