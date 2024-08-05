/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                "sky-light": "#C2C2C2",
                "sky": "#436deb",
                "dark": "#17202a",
                "txt-grey": "#94a3b8",
                "grey-light": "#d0d3d4",
                "whatsapp": "#25D366",
                "facebook": "#4267B2",
                "twitter": "#1DA1F2"
            },
        },
    },
    plugins: [],
}