"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { useNavbarStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function NavbarMob({ className, ...props }: GenericProps) {
    const isMenuOpen = useNavbarStore((state) => state.isOpen);
    const setIsMenuOpen = useNavbarStore((state) => state.setIsOpen);

    const navContainerRef = useRef<HTMLDivElement | null>(null);
    const navListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof document === "undefined") return;

        if (isMenuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navContainerRef.current?.contains(event.target as Node) &&
                !navListRef.current?.contains(event.target as Node)
            )
                setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsMenuOpen]);

    return (
        <div
            aria-label="Mobile Menu"
            data-menu-open={isMenuOpen}
            className={cn(
                "fixed inset-x-0 z-40",
                "overflow-hidden p-4",
                "transition-all duration-500 ease-in-out",
                "h-0 data-[menu-open=true]:h-screen",
                "-top-1/2 bottom-0 data-[menu-open=true]:top-0",
                "md:hidden",
                className
            )}
            ref={navContainerRef}
            {...props}
        >
            <div
                className="mt-20 space-y-4 rounded-2xl bg-card p-4 py-6 drop-shadow-md backdrop-blur-sm"
                ref={navListRef}
            >
                <ul>
                    {siteConfig.menu.map((item, index, arr) => {
                        const Icon = Icons[item.icon];

                        return (
                            <li key={index} aria-label="Mobile Menu Item">
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between gap-2 text-foreground"
                                    target={
                                        item.isExternal ? "_blank" : "_self"
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{item.name}</span>
                                    <Icon className="size-5" />
                                </Link>

                                {index !== arr.length - 1 && (
                                    <div className="py-4">
                                        <Separator />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <Button
                    className="w-full bg-foreground text-sm shadow-[inset_1px_1px_10px_2px_rgba(0,0,0,0.2),inset_2px_0_0_0_rgba(255,255,255,0.2)]"
                    asChild
                >
                    <Link href="/auth/signin">Login</Link>
                </Button>
            </div>
        </div>
    );
}
