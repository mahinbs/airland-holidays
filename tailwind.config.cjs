/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#f2685f',
                    DEFAULT: '#de2e21',
                    dark: '#b32217',
                },
                secondary: {
                    light: '#fbde68',
                    DEFAULT: '#F59E0B',
                    dark: '#cca10a',
                }
            },
            fontFamily: {
                sans: ['Marcellus', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
