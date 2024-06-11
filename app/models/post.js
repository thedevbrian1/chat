import { createClient } from "~/.server/supabase"

export async function getPosts(request) {
    let { supabase, headers } = createClient(request);
    let { data, error } = await supabase
        .from('posts')
        .select('id,title');

    if (error) {
        throw error;
    }

    return { data, headers };
}

export async function getPostById(request, id) {
    let { supabase, headers } = createClient(request);
    let { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', Number(id));

    if (error) {
        throw error;
    }

    return { data, headers };
}

export async function createPost(request, title, content, userId, published) {
    let { supabase, headers } = createClient(request);
    let { data, error } = await supabase
        .from('posts')
        .insert([
            {
                title,
                content,
                user_id: userId,
                is_published: Boolean(published)
            }
        ])
        .select();
    if (error) {
        throw error;
    }

    return { data, headers };
}

export async function updatePost(request, title, content, published, postId) {
    let { supabase, headers } = createClient(request);
    let { status, error } = await supabase
        .from('posts')
        .update({
            title,
            content,
            is_published: Boolean(published)
        })
        .eq('id', Number(postId))
        .select();

    if (error) {
        throw error;
    }

    return { status, headers };
}