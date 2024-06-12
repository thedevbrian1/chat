import { ArrowLeftIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Form, Link, isRouteErrorResponse, json, useFetcher, useLoaderData, useNavigation, useRouteError } from "@remix-run/react";
import { getSession, sessionStorage, setSuccessMessage } from "~/.server/session";
import { getUser } from "~/.server/supabase";
import { ThreeDots } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { createComment, deleteComment, getPostComments } from "~/models/comment";
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
    let postId = params.id;

    let session = await getSession(request);

    let formData = await request.formData();
    let comment = formData.get('comment');
    let commentId = formData.get('commentId');
    let action = formData.get('_action');


    switch (action) {
        case 'createComment': {
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
        case 'deleteComment': {
            let { status, headers: deleteHeaders } = await deleteComment(request, commentId);

            if (status === 204) {
                setSuccessMessage(session, 'Deleted successfully!');
            }

            let allHeaders = {
                ...Object.fromEntries(deleteHeaders.entries()),
                "Set-Cookie": await sessionStorage.commitSession(session)
            };

            return json({ ok: true }, {
                headers: allHeaders
            });
        }
    }

}

export default function Post() {
    let { post, comments } = useLoaderData();

    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <main className="pt-32 px-6 lg:px-0 lg:max-w-2xl mx-auto text-white">
            <div className="flex justify-between">
                <Link
                    to="/posts"
                    prefetch="intent"
                    className="flex gap-2 items-center hover:underline"
                >
                    <ArrowLeftIcon /> All posts
                </Link>
                <div className="flex gap-2">
                    <Button type="submit" variant="destructive" className="flex gap-2 items-center">
                        <TrashIcon />  Delete
                    </Button>
                    <Link
                        to="edit"
                        prefetch="intent"
                        className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md flex gap-2 items-center text-black"
                    >
                        <Pencil1Icon />  Edit
                    </Link>
                </div>
            </div>

            <h1 className="font-semibold text-4xl lg:text-5xl mt-16">{post[0]?.title}</h1>
            <div className="mt-8  text-black">
                {post[0]?.content}
            </div>
            {comments.length === 0
                ? <p className="text-gray-300 mt-4">No comments yet</p>
                : <div className="mt-4">
                    <h2>Comments</h2>
                    <ul className="mt-2 space-y-2">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                content={comment.content}
                                commentId={comment.id}
                            />
                        ))}
                    </ul>
                </div>
            }
            <Form method="post" className="mt-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        name="comment"
                        placeholder="This is such a good post"
                        className="placeholder:text-gray-300 focus-visible:ring-4 focus-visible:ring-brand-brown shadow-md"
                    />
                    <Button
                        type="submit"
                        name="_action"
                        value="createComment"
                        className="bg-purple-600 shadow focus-visible:ring-4 focus-visible:ring-brand-brown"
                    >
                        {isSubmitting ? <span className="w-10"><ThreeDots /></span> : 'Add comment'}
                    </Button>
                </div>
            </Form>
        </main>
    );
}

function Comment({ content, commentId }) {
    let fetcher = useFetcher();
    let isDeleting = fetcher.state !== 'idle' && fetcher.formData.get('_action') === 'deleteComment';

    return (
        <li className={`bg-[#775d8b] ${isDeleting ? 'opacity-50' : ''} p-4 flex justify-between items-center rounded-md`}>
            {content}
            <fetcher.Form method="post">
                <input type="hidden" name="commentId" value={commentId} />
                <button
                    type="submit"
                    name="_action"
                    value="deleteComment"
                    className="text-red-500 hover:text-red-600 transition-colors ease-in-out duration-300"
                >
                    <TrashIcon />
                </button>
            </fetcher.Form>
        </li>
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