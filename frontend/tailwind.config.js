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
        surface: "#161616",
        border: "#262626",
        text: {
          primary: "#EDEDED",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        accent: {
          DEFAULT: "#6366F1",
          glow: "rgba(99, 102, 241, 0.15)",
        },
        aqua: "#00E5FF",
        blush: "#FF2D95",
        ink: {
          900: "#000000",
        },
        slate: "#94A3B8",
        lime: "#A3E635",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at top, #1A1A1A, #0A0A0A)",
      },
      letterSpacing: {
        premium: "0.02em",
        tighter: "-0.04em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

