/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: {
          primary: "#0A0A0A",
          secondary: "#111111",
        },
        text: {
          primary: "#EDEDED",
          muted: "#9CA3AF",
        },
        accent: {
          primary: "#6366F1",
          secondary: "#007AFF",
          DEFAULT: "#6366F1",
          glow: "rgba(99, 102, 241, 0.15)",
        },
        bg: {
          card: "#161616",
        },
        border: {
          main: "#262626",
          DEFAULT: "#262626",
        },
        // Legacy Support
        surface: "#161616",
        aqua: "#6366F1",
        blush: "#007AFF",
        ink: {
          900: "#0A0A0A",
        },
        slate: "#9CA3AF",
        lime: "#10B981",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      letterSpacing: {
        premium: "0.02em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
}

