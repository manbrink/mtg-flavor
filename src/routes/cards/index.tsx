import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$ } from "@builder.io/qwik-city";

import { createServerClient } from "supabase-auth-helpers-qwik";
import { Image } from "@unpic/qwik";
import { LuArrowBigLeft, LuThumbsUp } from "@qwikest/icons/lucide";

import type { Card } from "../types";
import { inLocalStorage } from "../queries";

export const useDB = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get("PUBLIC_SUPABASE_URL")!,
    requestEv.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
    requestEv
  );

  const { data } = await supabaseClient
    .from("cards")
    .select("*")
    .limit(200)
    .order("up_votes", { ascending: false });

  return { data };
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
  const cardData = cardSignal.value.data as Card[];

  const action = useUpVote();

  return (
    <>
      <div class="absolute left-0 top-0 px-3 py-4 text-3xl">
        <a href="/">
          <LuArrowBigLeft />
        </a>
      </div>

      <header class="pb-8 pt-2">
        <div class="text-2xl">Top Cards</div>
      </header>

      <div class="grid items-start sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card: Card) => (
          <section
            key={card.id}
            class="mx-auto flex min-h-full flex-col items-center justify-start"
          >
            <div class="shadow-lg">
              <div class="pb-1 text-sm opacity-70">
                upvotes: {card.up_votes}
              </div>
              <div class="relative">
                <Image
                  src={card.scryfall_art_crop_url}
                  layout="fixed"
                  width={300}
                  height={225}
                  alt={card.name}
                />

                <div class="absolute right-0 top-0 cursor-pointer p-1 text-gray-200 opacity-60 transition-opacity duration-1000 hover:opacity-100">
                  <LuThumbsUp
                    onClick$={async () => {
                      if (!inLocalStorage(card)) {
                        localStorage.setItem(card.id, "true");
                        await action.submit({
                          id: card.id,
                          up_votes: card.up_votes + 1,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="p-4">
              <h1 class="pb-1 text-2xl">{card.name}</h1>
              <h2 class="pb-1 text-lg opacity-70">{card.set_name}</h2>
              <p class="text-base italic opacity-70">{card.flavor_text}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
});
