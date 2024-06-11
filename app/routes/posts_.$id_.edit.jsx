import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Form, Link, isRouteErrorResponse, json, useLoaderData, useNavigation, useParams, useRouteError } from "@remix-run/react";
import { getSession, sessionStorage, setSuccessMessage } from "~/.server/session";
import { getUser } from "~/.server/supabase";
import { FormSpacer } from "~/components/FormSpacer";
import { ThreeDots } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { getPostById, updatePost } from "~/models/post";

export async function loader({ request, params }) {
    let postId = params.id;

    // FIXME: Shows empty array for some ids

    let { data, headers } = await getPostById(request, postId);
    let { user, headers: userHeaders } = await getUser(request);

    if (data[0].user_id !== user.id) {
        throw new Response('Forbidden', {
            status: 403
        });
    }

    let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        ...Object.fromEntries(userHeaders.entries()),
    }
    return json({ post: data }, {
        headers: allHeaders
    });
}

export async function action({ request, params }) {
    let postId = params.id;

    let session = await getSession(request);

    let formData = await request.formData();
    let title = formData.get('title');
    let content = formData.get('content');
    let published = formData.get('published');

    let { status, headers } = await updatePost(request, title, content, published, postId);

    console.log({ status });

    if (status === 204 || status === 200) {
        setSuccessMessage(session, "Updated successfully!");
    }

    let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        "Set-Cookie": await sessionStorage.commitSession(session)
    };

    return json({ ok: true }, {
        headers: allHeaders
    });

}

export default function EditPost() {
    let { post } = useLoaderData();

    console.log({ post });

    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';

    let params = useParams();
    let postId = params.id;

    return (
        <main className="pt-32 px-6 lg:px-0 lg:max-w-lg mx-auto text-white">
            <Link to={`/posts/${postId}`} className="flex gap-2 items-center hover:underline">
                <ArrowLeftIcon /> Back to post
            </Link>
            <h1 className="font-semibold text-4xl lg:text-5xl mt-16">Edit Post</h1>
            <Form method="post" className="mt-8">
                <fieldset className="space-y-4">
                    <div className="flex gap-2 justify-end">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            defaultChecked={post[0]?.is_published}
                            className="focus-visible:ring-4 focus-visible:ring-brand-brown"
                        />
                        <label htmlFor="published">Is published</label>
                    </div>
                    <FormSpacer>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={post[0]?.title}
                            className="focus-visible:ring-4 focus-visible:ring-brand-brown"
                        />
                    </FormSpacer>
                    <FormSpacer>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            name="content"
                            id="content"
                            defaultValue={post[0]?.content}
                            className="focus-visible:ring-4 focus-visible:ring-brand-brown"
                        />
                    </FormSpacer>
                    <div className="flex justify-end">
                        <Button type="submit" className="focus-visible:ring-4 focus-visible:ring-black bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300">
                            {isSubmitting ? <span className="w-10"><ThreeDots /></span> : 'Save'}
                        </Button>
                    </div>
                </fieldset>
            </Form>
        </main>
    );
}

export function ErrorBoundary() {
    let error = useRouteError();
    let params = useParams();
    let postId = params.id;
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
                        <Link to={`/posts/${postId}`} prefetch="intent" className="bg-brand-brown hover:bg-[#ecba65] transition-colors ease-in-out duration-300 px-4 py-2 rounded-md">Try again</Link>
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