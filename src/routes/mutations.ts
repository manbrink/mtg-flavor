import { server$ } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";

export const upVote = server$(async (upVote) => {
  const supabaseClient = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabaseClient
    .from("cards")
    .update({ up_votes: upVote.up_votes })
    .eq("id", upVote.id)
    .select();

  if (error) {
    console.error(error);
  } else {
    return {
      success: true,
      data,
    };
  }
});
