module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        rose: "#F2559C",
        "rose-deep": "#D63384",
        violet: "#7C3AED",
        "violet-deep": "#5B21B6",
        "pink-pale": "#FDEEF6",
        "lavender-pale": "#F2ECFB",
        green: "#2FAE6B",
        "green-pale": "#E8F7EF",
        ink: "#221733",
        "ink-soft": "#7A6C8C",
        "ink-faint": "#B7A9C9",
        line: "#EFE3F3",
        bg: "#F8F3FA",
      },
    },
  },
};