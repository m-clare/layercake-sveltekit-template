/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',

    vite: {
      ssr: {
        noExternal: []
      },
      optimizeDeps: {
        include: ['layercake', 'd3-geo']
      }
    }
  }
};

export default config;