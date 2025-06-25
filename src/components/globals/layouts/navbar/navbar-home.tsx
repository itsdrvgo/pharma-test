"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useNavbarStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavbarHome() {
    const pathname = usePathname();
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    const isMenuOpen = useNavbarStore((state) => state.isOpen);
    const setIsMenuOpen = useNavbarStore((state) => state.setIsOpen);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > previous && latest > 150) setIsMenuHidden(true);
        else setIsMenuHidden(false);
    });

    return (
        <motion.header
            variants={{
                visible: {
                    y: 0,
                },
                hidden: {
                    y: "-100%",
                },
            }}
            animate={isMenuHidden ? "hidden" : "visible"}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className={cn(
                "inset-x-0 top-0 z-50 flex h-auto w-full items-center justify-center bg-transparent p-4 px-3",
                pathname === "/" ? "fixed" : "sticky"
            )}
            data-menu-open={isMenuOpen}
        >
            <nav className="relative z-10 flex w-full max-w-5xl items-center justify-between gap-5 overflow-hidden rounded-2xl bg-card/80 p-4 shadow-md backdrop-blur-sm md:px-8 xl:max-w-7xl">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl font-bold"
                >
                    <p className="text-xl font-bold md:text-2xl">
                        {siteConfig.name}
                    </p>
                </Link>

                <div className="flex items-center gap-6">
                    <ul className="hidden items-center gap-1 sm:flex">
                        {!!siteConfig.menu.length &&
                            siteConfig.menu.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className="relative rounded-lg p-1.5 px-4 font-semibold transition-all ease-in-out hover:bg-muted"
                                        href={item.href}
                                        target={
                                            item.isExternal
                                                ? "_blank"
                                                : undefined
                                        }
                                        referrerPolicy={
                                            item.isExternal ? "no-referrer" : ""
                                        }
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    <div className="flex items-center gap-6">
                        <button
                            aria-label="Mobile Menu Toggle Button"
                            aria-pressed={isMenuOpen}
                            className="sm:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Icons.Menu className="size-6" />
                        </button>

                        <Button
                            asChild
                            className="hidden rounded-lg bg-foreground px-8 text-sm shadow-[inset_1px_1px_10px_2px_rgba(0,0,0,0.2),inset_2px_0_0_0_rgba(255,255,255,0.2)] md:flex"
                        >
                            <Link href="/auth/signin">Login</Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}
