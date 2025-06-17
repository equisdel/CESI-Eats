module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, '.ts', '.tsx'];
      return webpackConfig;
    },
  },
};