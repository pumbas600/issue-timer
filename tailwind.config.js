/** @type {import('tailwindcss').Config} */

function at(url) {
    return `${url}/**/*.{js,ts,jsx,tsx}`;
}

module.exports = {
    content: ['src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
