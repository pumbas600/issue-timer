/** @type {import('tailwindcss').Config} */

function at(url) {
    return `${url}/**/*.{js,ts,jsx,tsx}`;
}

module.exports = {
    content: [at('./pages'), at('./components'), at('./styles')],
    theme: {
        extend: {},
    },
    plugins: [],
};
