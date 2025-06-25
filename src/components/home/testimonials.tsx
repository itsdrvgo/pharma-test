"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTestimonial } from "@/lib/react-query";
import { Testimonial } from "@/lib/validations";
import { PlayCircle } from "lucide-react";
import { GeneralShell } from "../globals/layouts";
import { Card, CardContent } from "../ui/card";

interface PageProps {
    initialData?: Testimonial[];
}

const dummyData: Testimonial[] = [
    {
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        name: "Sarah Johnson",
        content:
            "The customer service I received was exceptional. The team was knowledgeable and went above and beyond to help me with my order.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date("2024-05-15T10:30:00Z"),
        updatedAt: new Date("2024-05-15T10:30:00Z"),
    },
    {
        id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
        name: "Michael Chen",
        content:
            "I am incredibly impressed with the quality of the products. They are durable, well-designed, and have exceeded my expectations.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date("2024-05-20T14:00:00Z"),
        updatedAt: new Date("2024-05-20T14:00:00Z"),
    },
    {
        id: "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
        name: "Emily Rodriguez",
        content:
            "The fast shipping and hassle-free returns make shopping here a breeze. I always feel confident in my purchases.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date("2024-06-01T09:00:00Z"),
        updatedAt: new Date("2024-06-01T09:00:00Z"),
    },
    {
        id: "d4e5f6a7-b8c9-0123-4567-890abcdef012",
        name: "David Lee",
        content:
            "I love the variety of products available. There is always something new and exciting to discover on this site.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date("2024-06-10T18:45:00Z"),
        updatedAt: new Date("2024-06-10T18:45:00Z"),
    },
];

const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
};

export function Testimonials({ initialData }: PageProps) {
    const { useScan } = useTestimonial();
    const { data: testimonials } = useScan({ initialData, limit: 4 });

    const data = testimonials?.length ? testimonials : dummyData;

    if (!data?.length) return null;

    return (
        <GeneralShell>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    What Our Customers Say
                </h2>
                <p className="max-w-xl text-muted-foreground">
                    Hear from our satisfied customers about their experience
                    with our products and services.
                </p>
            </div>

            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {data.map((testimonial) => (
                        <CarouselItem
                            key={testimonial.id}
                            className="md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card className="h-full">
                                    <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg">
                                                    <div className="flex size-full items-center justify-center bg-secondary">
                                                        <PlayCircle className="size-12 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl p-0">
                                                <div className="relative aspect-video">
                                                    <iframe
                                                        className="absolute size-full"
                                                        src={getYouTubeEmbedUrl(
                                                            testimonial.videoUrl
                                                        )}
                                                        title={testimonial.name}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <blockquote className="flex h-full flex-col justify-center">
                                            <p className="font-medium text-balance">
                                                &quot;
                                                {testimonial.content}
                                                &quot;
                                            </p>
                                            <footer className="mt-4 text-sm text-muted-foreground">
                                                - {testimonial.name}
                                            </footer>
                                        </blockquote>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </GeneralShell>
    );
}
