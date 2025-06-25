import { Blogs, Landing, Testimonials } from "@/components/home";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

export default function Page() {
    return (
        <>
            <Landing />
            <Suspense>
                <TestimonialsFetch />
            </Suspense>
            <Suspense>
                <BlogsFetch />
            </Suspense>
        </>
    );
}

async function TestimonialsFetch() {
    const data = await queries.testimonial.scan({ limit: 4 });
    return <Testimonials initialData={data} />;
}

async function BlogsFetch() {
    const data = await queries.blog.scan({ limit: 5 });
    return <Blogs initialData={data} />;
}
