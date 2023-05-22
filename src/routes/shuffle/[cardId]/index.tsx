import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";
import { Image } from "@unpic/qwik";
import {
  LuRefreshCcw,
  LuThumbsUp,
  LuArrowBigLeft,
} from "@qwikest/icons/lucide";

export const useDB = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const shuffleData = await supabaseClient.rpc("shuffle");

  const cardData = await supabaseClient
    .from("cards")
    .select()
    .eq("id", requestEv.params.cardId);

  return { cardData, shuffleData };
});

export const useUpVote = routeAction$(async (upVote, requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
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

export default component$(() => {
  const cardSignal = useDB();
  const cardData = cardSignal.value.cardData.data[0];
  const shuffleData = cardSignal.value.shuffleData.data;

  const action = useUpVote();

  return (
    <>
      <div class="absolute left-0 top-0 px-3 py-4 text-3xl">
        <a href="/">
          <LuArrowBigLeft />
        </a>
      </div>

      <header class="pb-4 pt-2">
        <div>
          <Form class="flex justify-center">
            <a class="px-3 pb-2 text-2xl" href={`/shuffle/${shuffleData.id}`}>
              <LuRefreshCcw />
            </a>
            <div class="cursor-pointer px-3 pb-2 text-2xl">
              <LuThumbsUp
                preventdefault:click
                onClick$={async () => {
                  await action.submit({
                    id: cardData.id,
                    up_votes: cardData.up_votes + 1,
                  });
                }}
              />
            </div>
          </Form>
        </div>
      </header>

      <section class="mx-auto flex flex-col items-center justify-center">
        <div class="shadow-lg">
          <div class="pb-1 text-sm opacity-70">
            upvotes: {cardData.up_votes}
          </div>
          <div class="overflow-hidden">
            <Image
              src={cardData.scryfall_art_crop_url}
              layout="fullWidth"
              alt={cardData.name}
            />
          </div>
        </div>

        <div class="p-4">
          <h1 class="pb-1 text-2xl">{cardData.name}</h1>
          <h2 class="pb-1 text-lg opacity-70">{cardData.set_name}</h2>
          <p class="text-base italic opacity-70">{cardData.flavor_text}</p>
        </div>
      </section>
    </>
  );
});
