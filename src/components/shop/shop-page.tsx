"use client";

import { DEFAULT_PAGINATION_LIMIT } from "@/config/const";
import { productQueries } from "@/lib/queries/product";
import { useProduct } from "@/lib/react-query";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import { GeneralShell } from "../globals/layouts";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PageProps {
    initialData: Awaited<ReturnType<typeof productQueries.paginate>>;
}

export function ShopPage({ initialData }: PageProps) {
    const [first] = useQueryState(
        "first",
        parseAsInteger.withDefault(DEFAULT_PAGINATION_LIMIT)
    );
    const [, setAfter] = useQueryState("after", {
        defaultValue: "",
        shallow: true,
    });

    const { usePaginate } = useProduct();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        usePaginate({ initialData, first });

    const products = data?.pages.flatMap((page) => page.edges) ?? [];
    const lastCursor = data?.pages[data.pages.length - 1].pageInfo.endCursor;

    useEffect(() => {
        if (lastCursor) setAfter(lastCursor);
    }, [lastCursor, setAfter]);

    return (
        <GeneralShell>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Shop
                </h2>
                <p className="max-w-xl text-muted-foreground">
                    Browse our collection of high-quality products.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(({ node: product }) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden transition-all hover:shadow-lg"
                    >
                        <Link href={`/product/${product.id}`}>
                            <CardHeader className="p-0">
                                <div className="relative aspect-square">
                                    <Image
                                        src={
                                            product.images.edges[0]?.node
                                                .originalSrc ??
                                            "/placeholder.svg"
                                        }
                                        alt={
                                            product.images.edges[0]?.node
                                                .altText ?? product.title
                                        }
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="truncate text-lg leading-snug font-semibold">
                                    {product.title}
                                </CardTitle>
                                <p className="mt-2 text-sm font-semibold">
                                    {
                                        product.variants.edges[0]?.node.priceV2
                                            .amount
                                    }{" "}
                                    {
                                        product.variants.edges[0]?.node.priceV2
                                            .currencyCode
                                    }
                                </p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
            {hasNextPage && (
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        size="lg"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </GeneralShell>
    );
}
