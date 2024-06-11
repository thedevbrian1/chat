import { Form, Link, isRouteErrorResponse, json, useActionData, useNavigation, useRouteError } from "@remix-run/react";
import { getSession, sessionStorage, setSuccessMessage } from "~/.server/session";
import { createClient } from "~/.server/supabase";
import { badRequest, validateEmail, validatePassword } from "~/.server/validation";
import { FormSpacer } from "~/components/FormSpacer";
import { ThreeDots } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export async function action({ request }) {
    let session = await getSession(request);

    let formData = await request.formData();
    let email = formData.get('email');
    let password = formData.get('password');

    let fieldErrors = {
        email: validateEmail(email.trim()),
        password: validatePassword(password)
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors });
    }

    let { supabase, headers } = createClient(request);
    let { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        throw error;
    }

    setSuccessMessage(session, 'Check your email to verify it');

    let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        "Set-Cookie": await sessionStorage.commitSession(session)
    };

    return json({ ok: true }, {
        headers: allHeaders
    });
}

export default function Signup() {
    let actionData = useActionData();

    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';

    return (
        <main className="h-screen w-full bg-[url('https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
            <div className="w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-sky-900 via-sky-900 via-50% flex lg:items-center landscape:items-center">
                <div className="w-full px-6 lg:pl-20 md:max-w-xl lg:max-w-md mx-auto lg:mx-0 pt-28 landscape:pt-0 md:pt-72 lg:pt-0 text-white">
                    <h1 className="font-bold text-4xl md:text-5xl">Signup</h1>
                    <Form method="post" className="mt-8">
                        <fieldset className="space-y-4">
                            <FormSpacer>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="johndoe@email.com"
                                    className={`focus-visible:ring-4 focus-visible:ring-brand-brown ${actionData?.fieldErrors?.email ? 'border border-red-500' : ''}`}
                                />
                                {actionData?.fieldErrors?.email
                                    ? <p className="text-red-400 text-sm transition ease-in-out duration-300">{actionData.fieldErrors.email}</p>
                                    : <>&nbsp;</>
                                }
                            </FormSpacer>
                            <FormSpacer>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={`focus-visible:ring-4 focus-visible:ring-brand-brown ${actionData?.fieldErrors?.password ? 'border border-red-500' : ''}`}
                                />
                                {actionData?.fieldErrors?.password
                                    ? <p className="text-red-400 text-sm transition ease-in-out duration-300">{actionData.fieldErrors.password}</p>
                                    : <>&nbsp;</>
                                }
                            </FormSpacer>
                            <Button type="submit" className="w-full bg-[#C181B9] hover:bg-[#d4a7ce] transition ease-in-out duration-300 text-black focus-visible:ring-4 focus-visible:ring-brand-brown">
                                {isSubmitting ? <span className="w-10"><ThreeDots /></span> : 'Sign Up'}
                            </Button>
                        </fieldset>
                    </Form>
                </div>
            </div>
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