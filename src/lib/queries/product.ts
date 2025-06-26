import { shopify } from "../graphql";

class ProductQuery {
    async paginate(first: number, cursor: string | null = null) {
        const data = await shopify("query")({
            products: [
                { first, after: cursor },
                {
                    edges: {
                        node: {
                            id: true,
                            title: true,
                            handle: true,
                            descriptionHtml: true,
                            images: [
                                { first: 1 },
                                {
                                    edges: {
                                        node: {
                                            originalSrc: true,
                                            altText: true,
                                        },
                                    },
                                },
                            ],
                            variants: [
                                { first: 1 },
                                {
                                    edges: {
                                        node: {
                                            id: true,
                                            priceV2: {
                                                amount: true,
                                                currencyCode: true,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    pageInfo: {
                        hasNextPage: true,
                        endCursor: true,
                        hasPreviousPage: true,
                    },
                },
            ],
        });

        return data.products;
    }

    async get(id: string) {
        const data = await shopify("query")({
            product: [
                { id },
                {
                    id: true,
                    title: true,
                    descriptionHtml: true,
                    images: [
                        { first: 1 },
                        {
                            edges: {
                                node: {
                                    originalSrc: true,
                                    altText: true,
                                },
                            },
                        },
                    ],
                    variants: [
                        { first: 1 },
                        {
                            edges: {
                                node: {
                                    id: true,
                                    priceV2: {
                                        amount: true,
                                        currencyCode: true,
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        });

        return data.product;
    }
}

export const productQueries = new ProductQuery();
