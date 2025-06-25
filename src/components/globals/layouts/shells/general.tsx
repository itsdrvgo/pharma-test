import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface ShellProps extends LayoutProps {
    classNames?: {
        mainWrapper?: ClassValue;
        innerWrapper?: ClassValue;
    };
}

export function GeneralShell({ children, classNames }: ShellProps) {
    return (
        <section
            className={cn(
                "flex w-full justify-center",
                classNames?.mainWrapper
            )}
        >
            <div
                className={cn(
                    "w-full max-w-5xl space-y-4 p-4 py-5 md:p-8 md:py-10 xl:max-w-7xl",
                    classNames?.innerWrapper
                )}
            >
                {children}
            </div>
        </section>
    );
}
