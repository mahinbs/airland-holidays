/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /** Deep Teal — primary brand */
                primary: {
                    light: '#1a6574',
                    DEFAULT: '#0B3C49',
                    dark: '#072a32',
                },
                /** Warm Gold — secondary */
                secondary: {
                    light: '#d4c49a',
                    DEFAULT: '#B8965A',
                    dark: '#967a48',
                },
            },
            fontFamily: {
                sans: ['Marcellus', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
