import { DM_Sans, Rubik } from "next/font/google";

export const dmsans = DM_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "800", "900", "1000"],
    display: "swap",
    variable: "--font-dmsans",
});

export const rubik = Rubik({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
    variable: "--font-rubik",
});
