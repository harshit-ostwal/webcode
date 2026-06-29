import { Inter, Manrope } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--Inter",
    preload: true,
    display: "swap",
    style: "normal",
    adjustFontFallback: false,
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--Manrope",
    preload: true,
    display: "swap",
    style: "normal",
    adjustFontFallback: false,
});

export { inter, manrope };
