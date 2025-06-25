import { getAbsoluteURL } from "@/lib/utils";

export const siteConfig: SiteConfig = {
    name: "Freveo",
    description:
        "A freelancer's all-in-one tool for managing clients, projects, and payments",
    longDescription:
        "Freveo is an all-in-one dashboard for freelancers to manage clients, track projects, and handle invoices. Create legal docs, send bills, and boost productivity—simplify your freelance life with Freveo.",
    keywords: [
        "freelancer tool",
        "client management",
        "freelance dashboard",
        "project tracking",
        "invoice creator",
        "legal documents for freelancers",
        "time tracking tool",
        "freelance productivity",
        "manage freelance clients",
        "freelancer app",
        "client organizer",
        "freelance workflow",
        "simple invoicing",
        "freelance business tool",
        "project management for freelancers",
    ],
    category: "Productivity Software for Freelancers",
    developer: {
        name: "DRVGO",
        url: "https://itsdrvgo.me/",
    },
    og: {
        url: getAbsoluteURL("/og.webp"),
        width: 1200,
        height: 630,
    },
    contact: "contact@freveo.com",
    menu: [
        {
            name: "Features",
            href: "/#features",
            icon: "User",
        },
        {
            name: "Pricing",
            href: "/pricing",
            icon: "DollarSign",
        },
        {
            name: "Support",
            href: "/support",
            icon: "LifeBuoy",
        },
    ],
};
