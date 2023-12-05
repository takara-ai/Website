/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./env/layouts/**/*.html", "./env/content/**/*.md"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
