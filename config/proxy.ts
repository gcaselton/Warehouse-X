/**
 * @name Proxy Configuration
 * @see The agent cannot take effect in the production environment,
 * so there is no configuration for the production environment.
 * For details, please see:
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // Uncomment and adjust if you need to customize the local development server
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // Target address to proxy
      target: 'https://preview.pro.ant.design',
      // This configuration allows HTTP to proxy to HTTPS
      // May be required for features depending on origin, such as cookies
      changeOrigin: true,
    },
  },

  /**
   * @name Detailed Proxy Configuration
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> http://117.72.14.250:8501/**
    '/api/': {
      target: 'http://117.72.14.250:8501',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre URL',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
