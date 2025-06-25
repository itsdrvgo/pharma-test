"use client";

import { BLOG_TYPES } from "@/config/const";
import { useBlog } from "@/lib/react-query";
import { cn, convertValueToLabel } from "@/lib/utils";
import { Blog } from "@/lib/validations";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { GeneralShell } from "../globals/layouts";
import { buttonVariants } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PageProps extends GenericProps {
    initialData: Blog[];
}

const dummyData: Blog[] = [
    {
        id: "blog-1",
        title: "The Future of Personalized Medicine",
        slug: "future-of-personalized-medicine",
        content:
            "Discover how AI and genomics are revolutionizing treatment plans, making healthcare more precise and effective than ever before.",
        author: "Dr. Evelyn Reed",
        type: "doctor_insight",
        tags: ["AI in Healthcare", "Genomics", "Personalized Medicine"],
        thumbnailUrl:
            "https://images.unsplash.com/photo-1581091224002-0d4a0131fee2?q=80&w=1950&auto=format&fit=crop",
        category: "Medical Innovations",
        createdAt: new Date("2024-06-20T10:00:00Z"),
        updatedAt: new Date("2024-06-20T10:00:00Z"),
    },
    {
        id: "blog-2",
        title: "Navigating the World of Supplements",
        slug: "navigating-the-world-of-supplements",
        content:
            "A comprehensive guide to understanding vitamins, minerals, and herbal supplements. Learn what to take, what to avoid, and how to choose high-quality products.",
        author: "John Doe",
        type: "patient_story",
        tags: ["Supplements", "Vitamins", "Wellness"],
        thumbnailUrl:
            "https://images.unsplash.com/photo-1607619056574-7d8d39780e8c?q=80&w=1950&auto=format&fit=crop",
        category: "Nutrition",
        createdAt: new Date("2024-06-18T14:30:00Z"),
        updatedAt: new Date("2024-06-18T14:30:00Z"),
    },
    {
        id: "blog-3",
        title: "Mental Wellness in the Digital Age",
        slug: "mental-wellness-in-the-digital-age",
        content:
            "Strategies for maintaining mental health in a world of constant connectivity. Explore mindfulness, digital detoxes, and the importance of human connection.",
        author: "Dr. Samantha Carter",
        type: "doctor_insight",
        tags: ["Mental Health", "Wellness", "Digital Detox"],
        thumbnailUrl:
            "https://images.unsplash.com/photo-1506126613408-4e65785f546b?q=80&w=1950&auto=format&fit=crop",
        category: "Mental Health",
        createdAt: new Date("2024-06-15T09:00:00Z"),
        updatedAt: new Date("2024-06-15T09:00:00Z"),
    },
    {
        id: "blog-4",
        title: "The Gut-Brain Axis: A Deep Dive",
        slug: "gut-brain-axis-deep-dive",
        content:
            "Explore the fascinating connection between your digestive system and your brain. Learn how gut health can impact your mood, cognitive function, and overall well-being.",
        author: "Jane Smith",
        type: "patient_story",
        tags: ["Gut Health", "Microbiome", "Neurology"],
        thumbnailUrl:
            "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1950&auto=format&fit=crop",
        category: "Health & Wellness",
        createdAt: new Date("2024-06-12T11:45:00Z"),
        updatedAt: new Date("2024-06-12T11:45:00Z"),
    },
    {
        id: "blog-5",
        title: "Innovations in Cancer Treatment",
        slug: "innovations-in-cancer-treatment",
        content:
            "A look at the latest breakthroughs in oncology, from immunotherapy to targeted therapies. Discover how these advancements are improving patient outcomes.",
        author: "Dr. James Wilson",
        type: "doctor_insight",
        tags: ["Cancer", "Oncology", "Immunotherapy"],
        thumbnailUrl:
            "https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=1950&auto=format&fit=crop",
        category: "Medical Research",
        createdAt: new Date("2024-06-10T16:20:00Z"),
        updatedAt: new Date("2024-06-10T16:20:00Z"),
    },
];

export function Blogs({ initialData }: PageProps) {
    const { useScan } = useBlog();
    const { data: blogs } = useScan({ initialData, limit: 5 });

    const data = blogs?.length ? blogs : dummyData;

    if (!data?.length) return null;

    return (
        <GeneralShell>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    From Our Blog
                </h2>
                <p className="max-w-xl text-muted-foreground">
                    Explore the latest articles and insights from our team of
                    experts.
                </p>
            </div>

            <Tabs defaultValue={BLOG_TYPES[0]} className="w-full">
                <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
                    {BLOG_TYPES.map((type) => (
                        <TabsTrigger key={type} value={type}>
                            {convertValueToLabel(type)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {BLOG_TYPES.map((type) => (
                    <TabsContent key={type} value={type} className="py-6">
                        <BlogGrid
                            blogs={data.filter((blog) => blog.type === type)}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </GeneralShell>
    );
}

function BlogGrid({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <Card
                    key={blog.id}
                    className="flex flex-col overflow-hidden transition-all hover:shadow-lg"
                >
                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex h-full flex-col"
                    >
                        <CardHeader className="p-0">
                            <div className="relative aspect-video">
                                <Image
                                    src={blog.thumbnailUrl}
                                    alt={blog.title}
                                    className="size-full object-cover"
                                    width={1920}
                                    height={1080}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-6">
                            <div className="mb-2 flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <CardTitle className="text-xl leading-snug font-semibold">
                                {blog.title}
                            </CardTitle>
                            <p className="mt-2 line-clamp-3 text-muted-foreground">
                                {blog.content}
                            </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-6 pt-0">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-sm font-semibold">
                                        {blog.author}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(
                                            new Date(blog.createdAt),
                                            "MMMM d, yyyy"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={cn(
                                    buttonVariants({
                                        variant: "link",
                                    }),
                                    "h-auto p-0"
                                )}
                            >
                                Read More
                            </span>
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>
    );
}
