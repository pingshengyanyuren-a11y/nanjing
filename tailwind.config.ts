import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'daiwa-gray': '#5A5A5A',
                'palace-red': '#C41E3A',
                'moon-white': '#F5F5F0',
                'stone-blue': '#3D5A80',
                'light-beige': '#F5F2E9',
                'sky-blue': '#87CEEB',
                'grass-green': '#66CC66',
                'warm-yellow': '#FFCC66',
            },
            fontFamily: {
                'song': ['serif'],
                'kai': ['cursive'],
            },
        },
    },
    plugins: [],
};

export default config;
