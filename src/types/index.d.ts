import { Icons } from "@/components/icons";
import { HTMLAttributes, ReactNode } from "react";

declare global {
    type GenericProps = HTMLAttributes<HTMLElement>;
    type LayoutProps = {
        children: ReactNode;
    };

    type SiteConfig = {
        name: string;
        description: string;
        longDescription?: string;
        category: string;
        og: {
            url: string;
            width: number;
            height: number;
        };
        developer: {
            name: string;
            url: string;
        };
        keywords: string[];
        contact: string;
        menu: {
            name: string;
            href: string;
            icon: keyof typeof Icons;
            isExternal?: boolean;
            isDisabled?: boolean;
        }[];
    };
}
