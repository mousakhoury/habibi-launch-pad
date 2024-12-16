import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            transitionProperty: {
                height: "height",
                spacing: "margin, padding",
            },
            boxShadow: {
                "sm-r": "0 -1px 2px 0px rgba(0, 0, 0, 0.5)",
            },
        },
    },

    plugins: [forms],
};
