"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Landing({ className, ...props }: GenericProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const imageVariants: Variants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section
            className={cn(
                "relative flex h-[80vh] items-center justify-center overflow-hidden",
                className
            )}
            {...props}
        >
            <motion.div
                className="absolute inset-0"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src="https://images.unsplash.com/photo-1750513309434-028e597d8f8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Landing Image"
                    width={1920}
                    height={1080}
                    className="size-full object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
            </motion.div>

            <motion.div
                className="z-10 flex flex-col items-center gap-8 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="z-50 text-5xl font-bold tracking-tighter text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
                        Your Health, Our Priority
                    </h1>
                    <p className="max-w-2xl text-lg text-muted drop-shadow-lg">
                        Discover premium pharmaceutical products and expert
                        advice tailored to your wellness journey.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button size="lg" asChild>
                        <Link href="/shop">Explore Products</Link>
                    </Button>
                    <Button variant="secondary" size="lg" asChild>
                        <Link href="/about">Take a Wellness Quiz</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
