import { Form, Link, isRouteErrorResponse, redirect, useNavigation, useRouteError } from "@remix-run/react";
import { getSession, sessionStorage, setSuccessMessage } from "~/.server/session";
import { getUser } from "~/.server/supabase";
import { FormSpacer } from "~/components/FormSpacer";
import { ThreeDots } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { createPost } from "~/models/post";

export async function action({ request }) {
    let session = await getSession(request);

    let formData = await request.formData();
    let title = formData.get('title');
    let content = formData.get('content');
    let published = formData.get('published');

    let { user, headers } = await getUser(request);
    let userId = user.id;

    let { data, headers: postHeaders } = await createPost(request, title, content, userId, published)

    let postId = data[0].id;

    setSuccessMessage(session, "Created succesfullly!");

    let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        ...Object.fromEntries(postHeaders.entries()),
        "Set-Cookie": await sessionStorage.commitSession(session)
    };

    return redirect(`/posts/${postId}`, {
        headers: allHeaders
    });
}

export default function NewPost() {
    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <main className="px-6 lg:px-0 lg:max-w-lg mx-auto pt-32 text-white">
            <h1 className="font-semibold text-4xl lg:text-5xl mt-16">New Post</h1>
            <Form method="post" className="mt-8">
                <fieldset className="space-y-4">
                    <div className="flex gap-2 justify-end">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
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
                            className="focus-visible:ring-4 focus-visible:ring-brand-brown"
                        />
                    </FormSpacer>
                    <FormSpacer>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            name="content"
                            id="content"
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