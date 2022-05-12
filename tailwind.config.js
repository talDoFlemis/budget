module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                light_dark: "#252525",
                gray: "#545863",
                yellow: "#f9c846",
            },
            boxShadow: {
                left_down: "10px 15px 20px -1px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#ef4444",
                    "primary-focus": "#c82525",
                    "primary-content": "#ffffff",
                    secondary: "#46d1f9",
                    "secondary-focus": "#41badd",
                    "secondary-content": "#ffffff",
                    accent: "#6e0b75",
                    "accent-focus": "#420746",
                    "accent-content": "#ffffff",
                    neutral: "#545863",
                    "neutral-focus": "#2a2e37",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#d1d5db",
                    "base-content": "#1f2937",
                    info: "#2094f3",
                    success: "#009485",
                    warning: "#ff9900",
                    error: "#ff5724",
                },
            },
        ],
    },
};
