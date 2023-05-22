import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";
import { Image } from "@unpic/qwik";
import { LuRefreshCcw, LuThumbsUp } from "@qwikest/icons/lucide";

export const useDB = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const { data } = await supabaseClient.rpc("shuffle");

  return { data };
});

export const useJokeVoteAction = routeAction$((props) => {
  // Leave it as an exercise for the reader to implement this.

  console.log("VOTE", props);
});

export default component$(() => {
  const cardSignal = useDB();
  const favoriteJokeAction = useJokeVoteAction();

  const cardData = cardSignal.value.data;

  return (
    <>
      <header class="py-6">
        <div>
          <Form action={favoriteJokeAction} class="flex justify-center px-4">
            <a class="p-2 text-2xl text-gray-200" href="/shuffle">
              <LuRefreshCcw />
            </a>
            <a class="p-2 text-2xl text-gray-200" href="/shuffle">
              <LuThumbsUp />
            </a>
          </Form>
        </div>
      </header>

      <section class="mx-auto flex flex-col items-center justify-center">
        <div class="w-[525px] shadow-lg">
          <div class="overflow-hidden">
            <Image
              src={cardData.scryfall_art_crop_url}
              layout="fixed"
              width={525}
              height={700}
              alt={cardData.name}
            />
          </div>
        </div>

        <div class="p-4 text-gray-200">
          <h1 class="pb-1 text-2xl">{cardData.name}</h1>
          <h2 class="pb-1 text-lg opacity-70">{cardData.set_name}</h2>
          <p class="text-base italic opacity-70">{cardData.flavor_text}</p>
        </div>
      </section>
    </>
  );
});
