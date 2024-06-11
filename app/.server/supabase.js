import { redirect } from "@remix-run/node";
import { createServerClient, parse, serialize } from "@supabase/ssr";

export function createClient(request) {
    let cookies = parse(request.headers.get('Cookie') ?? '');
    let headers = new Headers();

    let supabase = createServerClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY, {
        cookies: {
            get(key) {
                return cookies[key]
            },
            set(key, value, options) {
                headers.append('Set-Cookie', serialize(key, value, options))
            },
            remove(key, options) {
                headers.append('Set-Cookie', serialize(key, '', options))
            },
        }
    });
    return { supabase, headers };
}

export async function requireAdminUser(request) {
    let { supabase, headers } = createClient(request);
    let { data: { session } } = await supabase.auth.getSession();

    let user = session?.user;
    // console.log({ user });

    if (user?.email === process.env.ADMIN_EMAIL || user?.email === process.env.ADMIN_EMAIL_2) {
        return { user, headers };
    }
    throw await logout(request);
}

export async function requireUser(request, redirectTo = new URL(request.url).pathname) {
    let { supabase, headers } = createClient(request);
    let { data: { user } } = await supabase.auth.getUser();
    if (user) {
        return { user, headers };
    }
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
}

export async function getUser(request) {
    let { supabase, headers } = createClient(request);

    let { data: { user } } = await supabase.auth.getUser();
    return { user, headers };
}

export async function logout(request) {
    let { supabase, headers } = createClient(request);
    let { data } = await supabase.auth.signOut();

    return redirect('/login', {
        headers
    });
}