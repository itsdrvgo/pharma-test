import { ShopPage } from "@/components/shop";
import { DEFAULT_PAGINATION_LIMIT } from "@/config/const";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

interface PageProps {
    searchParams?: Promise<{
        after?: string;
    }>;
}

export default function Page(props: PageProps) {
    return (
        <Suspense>
            <ProductsFetch {...props} />
        </Suspense>
    );
}

async function ProductsFetch({ searchParams }: PageProps) {
    const after = await searchParams?.then((params) => params.after || null);

    const data = await queries.product.paginate(
        DEFAULT_PAGINATION_LIMIT,
        after || null
    );

    return <ShopPage initialData={data} />;
}
