module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: "no-2009",
      grid: "autoplace",
    },
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    cssnano: {
      preset: [
        "advanced",
        {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: false,
          mergeIdents: false,
          zindex: false,
          calc: false,
        },
      ],
    },
  },
};
