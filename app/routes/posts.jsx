import { PlusIcon } from "@radix-ui/react-icons";
import { Link, json, useLoaderData } from "@remix-run/react";
import { StarsIllustration } from "~/components/Icon";
import { getPosts } from "~/models/post";

export async function loader({ request }) {
    let { data, headers } = await getPosts(request);

    return json({ posts: data }, {
        headers
    });
}

export default function Posts() {
    let { posts } = useLoaderData();
    // let posts = [];
    return (
        <main className=" bg-[#9574AE] min-h-screen">
            <div className="px-6 lg:px-0 lg:max-w-2xl mx-auto pt-32 text-white">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-4xl lg:text-5xl">Posts</h1>
                    <Link
                        to="/posts/new"
                        prefetch="intent"
                        className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md flex items-center gap-2">
                        <PlusIcon /> New Post
                    </Link>
                </div>
                {posts.length === 0
                    ? <div className="w-full h-[70vh] grid place-items-center">
                        <div>
                            <div className="w-64">
                                <StarsIllustration />
                            </div>
                            <p className="text-center mt-4">No posts!</p>
                        </div>
                    </div>
                    : <div className="mt-8 flex flex-col gap-4 text-black">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.id}`}
                                prefetch="intent"
                                className="rounded-md bg-[#b59ec6] p-6 hover:underline"
                            >
                                <p>{post.title}</p>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </main>
    );
}