export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'JavaScraft',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og-image', property: 'og:image', content: 'https://res.cloudinary.com/dwd2eaext/image/upload/v1653946228/portfolio/cover_game__yqv0lp.png' },
      { hid: 'og-title', property: 'og:title', content: 'JavaScraft' },
      { hid: 'og-description', property: 'og:title', content: 'JavaScraft is a remake of the popular game for PC.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Do not auto-import component
  components: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-socket-io'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  io: {
    sockets: [
      {
        name: 'chatroom',
        url: (process.env.SOCKET_URL || 'http://localhost:3000'),
        default: true,
        retry: true
      }
    ]
  },
  // configuration required for netlify build
  generate: {
    fallback: true
  }
}
