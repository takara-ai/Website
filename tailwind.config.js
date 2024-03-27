/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./env/layouts/**/*.html",
    "./env/content/**/*.md",
    "./env/assets/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: "monospace",
        whisper: "'Caveat', cursive",
        japaneseBold: "Hiragino Kaku Gothic Std",
        japanese: "Hiragino Kaku Gothic ProN",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
