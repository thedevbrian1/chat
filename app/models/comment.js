import { createClient } from "~/.server/supabase";

export async function createComment(request, content, userId, postId) {
    let { supabase, headers } = createClient(request);
    let { status, error } = await supabase
        .from('comments')
        .insert([
            {
                content,
                user_id: userId,
                post_id: Number(postId)
            }
        ]);

    if (error) {
        throw error;
    }

    return { status, headers };
}

export async function getPostComments(request, postId, userId) {
    let { supabase, headers } = createClient(request);
    let { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', Number(postId));

    if (error) {
        throw error;
    }

    return { data, headers };
}