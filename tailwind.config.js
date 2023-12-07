/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./env/layouts/**/*.html", "./env/content/**/*.md"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "radial-gradient":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      }),
      colors: {
        coral: {
          darker: "#cd5b45", // or any color you want for the dark center
          lighter: "#ff7f50", // or any color you want for the light edges
        },
      },
      // If you don't already have a gradientColorStops in your theme, you'll need to add this
      gradientColorStops: (theme) => ({
        ...theme("colors"),
        "coral-darker": "#cd5b45",
        "coral-lighter": "#ff7f50",
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
