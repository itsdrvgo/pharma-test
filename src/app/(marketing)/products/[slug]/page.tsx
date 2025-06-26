import { GeneralShell } from "@/components/globals/layouts";
import { queries } from "@/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const productId = slug.split("-").pop() || "";
    const product = await queries.product.get(
        `gid://shopify/Product/${productId}`
    );

    if (!product) notFound();

    return {
        title: product.title,
        description:
            (product.descriptionHtml as string) ?? "No description available",
        openGraph: {
            title: product.title,
            description:
                (product.descriptionHtml as string) ??
                "No description available",
            images: [
                {
                    url:
                        (product.images.edges[0]?.node.originalSrc as string) ??
                        "/placeholder.svg",
                    width: 1200,
                    alt: product.title,
                },
            ],
        },
    };
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense>
                <ProductFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function ProductFetch({ params }: PageProps) {
    const { slug } = await params;

    const productId = slug.split("-").pop() || "";
    const product = await queries.product.get(
        `gid://shopify/Product/${productId}`
    );
    if (!product) notFound();

    return <></>;
}
