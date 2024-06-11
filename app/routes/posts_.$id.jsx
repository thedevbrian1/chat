import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Form, Link, isRouteErrorResponse, json, useLoaderData, useNavigation, useRouteError } from "@remix-run/react";
import { getSession, sessionStorage, setSuccessMessage } from "~/.server/session";
import { getUser } from "~/.server/supabase";
import { ThreeDots } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createComment, getPostComments } from "~/models/comment";
import { getPostById } from "~/models/post";

export async function loader({ request, params }) {
    let postId = params.id;

    let { user, headers: userHeaders } = await getUser(request);

    let { data, headers } = await getPostById(request, postId);

    let userId = user.id;

    let { data: comments, headers: commentHeaders } = await getPostComments(request, postId, userId);

    let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        ...Object.fromEntries(userHeaders.entries()),
        ...Object.fromEntries(commentHeaders.entries())
    };

    return json({ post: data, comments }, {
        headers: allHeaders
    });
}

export async function action({ request, params }) {
    let session = await getSession(request);

    let formData = await request.formData();
    let comment = formData.get('comment');

    let postId = params.id;

    let { user, headers: userHeaders } = await getUser(request);

    let userId = user.id;

    let { status, headers: commentHeaders } = await createComment(request, comment, userId, postId);

    if (status === 201) {
        setSuccessMessage(session, "Created successfully!");
    }

    let allHeaders = {
        ...Object.fromEntries(userHeaders.entries()),
        ...Object.fromEntries(commentHeaders.entries()),
        "Set-Cookie": await sessionStorage.commitSession(session)
    }
    return json({ ok: true }, {
        headers: allHeaders
    });
}

export default function Post() {
    let { post, comments } = useLoaderData();

    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <main className="pt-32 px-6 lg:px-0 lg:max-w-2xl mx-auto text-white">
            <div className="flex justify-between">
                <Link to="/posts" className="flex gap-2 items-center hover:underline">
                    <ArrowLeftIcon /> All posts
                </Link>
                <div className="flex gap-2">
                    <Button type="submit" variant="destructive" className="flex gap-2 items-center">
                        <TrashIcon />  Delete
                    </Button>
                    <Link to="edit" className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md flex gap-2 items-center text-black">
                        <Pencil1Icon />  Edit
                    </Link>
                </div>
            </div>

            <h1 className="font-semibold text-4xl lg:text-5xl mt-16">{post[0]?.title}</h1>
            <div className="mt-8 rounded-md bg-[#b59ec6] p-6 text-black">
                {post[0]?.content}
            </div>
            <ul className="mt-4 space-y-2">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
            <Form method="post" className="mt-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        name="comment"
                        placeholder="This is such a good post"
                        className="placeholder:text-gray-300 focus-visible:ring-4 focus-visible:ring-brand-brown shadow-md"
                    />
                    <Button type="submit" className="bg-purple-600 shadow focus-visible:ring-4 focus-visible:ring-brand-brown">
                        {isSubmitting ? <span className="w-10"><ThreeDots /></span> : 'Add comment'}
                    </Button>
                </div>
            </Form>
        </main>
    );
}

export function ErrorBoundary() {
    let error = useRouteError();

    if (isRouteErrorResponse(error)) {
        console.error({ error });
        return (
            <div className="w-full h-screen bg-[#3B4856] grid place-items-center">
                <div className="text-center text-white">
                    <h1 className="font-bold text-4xl lg:text-5xl">
                        {error.status} {error.statusText}
                    </h1>
                    <p>{error.data}</p>
                    <div className="mt-8">
                        <Link to="." prefetch="intent" className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md">Try again</Link>
                    </div>
                </div>
            </div>
        );
    } else if (error instanceof Error) {
        console.error({ error });
        return (
            <div className="w-full h-screen bg-[#3B4856] grid place-items-center">
                <div className="text-center text-white">
                    <h1 className="font-bold text-4xl lg:text-5xl">Error</h1>
                    <p className="mt-4">{error.message}</p>
                    <div className="mt-8">
                        <Link to="." prefetch="intent" className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md">Try again</Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}