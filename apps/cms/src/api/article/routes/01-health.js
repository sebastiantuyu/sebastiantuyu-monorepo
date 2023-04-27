module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: async (ctx) => {
        ctx.send({
          status: 'ok',
          uptime: process.uptime()
        });
      },
      config: {
        auth: false
      }
    }
  ]
};