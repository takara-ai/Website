/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./env/layouts/**/*.html",
    "./env/content/**/*.md",
    "./env/assets/**/*.js",
    "./env/hugo.toml",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: "monospace",
        whisper: "'Caveat', cursive",
        japaneseBold: "Hiragino Kaku Gothic Std",
        japanese: "Hiragino Kaku Gothic ProN",
      },
      fontSize: {
        "10xl": ["12rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
