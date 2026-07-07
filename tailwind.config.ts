import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Anton"', '"Impact"', '"Arial Black"', "sans-serif"],
        sans: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', "Consolas", "monospace"],
      },
      colors: {
        space: "#030014",
        ink: "#080719",
        acid: "#CCFF00",
        cyan: "#88AAFF",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
